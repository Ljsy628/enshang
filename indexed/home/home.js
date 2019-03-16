var bmap = require('../../wxapp-jsapi-master/src/bmap-wx.min.js');
var app = getApp()
Page({
    data: {
        //轮播图配置
        indicatorDots: true, //显示面板指示点
        autoplay: true, //自动切换
        interval: 3000, //自动切换时间间隔
        duration: 1000, //滑动动画时长
        imgUrls: [], //轮播图
        host: app.data.host, //域名
        profile: '', //园区简介
        park_img: '',
        // 选择园区弹窗
        park: false,
        parklist: [],
        zhe: false,
        weather: '',
        scroll: true,
        weatherData: [],
        provinceList: [], //弹窗省数据源
        cityList: [], //弹窗市数据源
        parkList: [], //弹窗园区数据源
        checkedProvince: '', //选中省级数据
        checkedCity: '', //选中市级数据
        checkedPark: '', //选中园区数据
        provinceIndex: 0, //省级默认下标
        cityIndex: 0, //市级默认下标
        parkIndex: 0, //园区默认下标
        areaid:0,
    },
    onLoad: function() {
        var that = this;
        var value = wx.getStorageSync('park_id');
        if (value == '' || value == null) {
            that.setData({
                park: true
            }),
            // 第一次进入进行定位
            wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                    var latitude = res.latitude
                    var longitude = res.longitude
                    wx.request({
                        url: app.data.host + "/api/Index/gpsObtain",
                        data: {
                            lat: latitude,
                            lon: longitude
                        },
                        success(res) {
                            that.setData({
                                areaid: res.data.areaid,
                                checkedProvince: res.data.province,
                                checkedCity: res.data.city,
                                parklist: res.data.parklist,
                            })
                            // // 首次登陆园区选择弹窗接口
                            // wx.request({
                            //     url: app.data.host + "/api/index/parkList",
                            //     data: {
                            //         areaid: that.data.areaid
                            //     },
                            //     success(res) {
                            //         if (res.statusCode == 200) {
                            //             that.setData({
                            //                 parklist: res.data
                            //             });
                            //         }
                            //     }
                            // })  
                        }
                    })
                },
                fail: function (res) {

                }
            })
        } else {
            that.setData({
                park: false,
                checkedPark:wx.getStorageSync('park_name')
            })
        }
        // 天气获取
        var BMap = new bmap.BMapWX({
            ak: 'yIDkrroR24bkqajPc9B9FEfn2qG4RpeF'
        });
        var fail = function(data) {
            that.setData({
                weatherData: 111
            });
        };
        var success = function(data) {
            that.setData({
                weatherData: data.currentWeather[0] 
            });
        }
        BMap.weather({
            fail: fail,
            success: success
        });

        
        //首页园区省级选择弹框
        wx.request({
            url: app.data.host + "/api/Area/areaList",
            success(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        provinceList: res.data
                    });
                }

            }
        })
        //首页轮播图接口
        wx.request({
            url: app.data.host + "/api/index/indexImg",
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        imgUrls: res.data
                    });
                }
            }
        })
        // 园区简介接口
        wx.request({
            url: app.data.host + "/api/index/park",
            data: {
                park_id: wx.getStorageSync('park_id')
            },
            success(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        profile: res.data
                    });
                    if (res.data.thumb != undefined && res.data.thumb != '') {
                        that.setData({
                            park_img: res.data.thumb
                        })
                    }
                }
            }
        })
        // 最新咨讯接口
        if (value != null && value != '') {
            wx.request({
                url: app.data.host + "/api/index/newsList",
                data: {
                    park_id: wx.getStorageSync('park_id')
                },
                success(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            newslist: res.data
                        });
                    }
                }
            })
        }
    },
    // -----------------------头部选择园区弹框 开始---------------------------------------------
    choshi: function(e) {
        var that = this;
        let index0 = e.currentTarget.dataset.index; //获取选中值的下标
        var pname = e.currentTarget.dataset.name; //获取选中值的id
        var $id = that.data.provinceList[index0].id; //获取选中值的id
        wx.request({
            url: app.data.host + "/api/Area/areaList",
            data: {
                id: $id
            },
            success(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        cityList: res.data,
                        provinceIndex: index0,
                        checkedProvince:pname
                    });
                }

            }
        })
    },
    shi: function(e) {
        var that = this;
        let cityIndex = e.currentTarget.dataset.index;
        var $id = that.data.cityList[cityIndex].id;
        var cname = e.currentTarget.dataset.name; 
        wx.request({
            url: app.data.host +'/api/Area/parkAdd',
            data:{id:$id},
            success:function(msg) {
                if(msg.statusCode == 200 && msg.data.code == 200) {
                    that.setData({
                        cityIndex:cityIndex,
                        checkedCity:cname,
                        parkList:msg.data.message
                    })
                }
            }
        })
    },
    hidepark: function (e) {
      var that = this;
      var $index = e.currentTarget.dataset.index;
      var parkid = e.currentTarget.dataset.id;
      var parkname = e.currentTarget.dataset.name;
      var $id = that.data.parkList[$index].id;
      wx.setStorageSync('park_id', parkid);
      wx.setStorageSync('park_name', parkname)
      that.setData({
        zhe: false,
        scroll: true,
        checkedPark: parkname,
        parkIndex: $index
      })
      this.onLoad()
    },
    //------------------------------------- 首次选择园区 ------------------------------------
    hideparkcho: function(res) {
        var that = this; 
      
        wx.setStorageSync('park_id', res.currentTarget.dataset.id),
        wx.setStorageSync('park_name', res.currentTarget.dataset.name)
        that.setData({
            park: false,
            checkedPark: res.currentTarget.dataset.name
        })
        this.onLoad()
    },

    //园区服务
    park_service: function() {
        wx.navigateTo({
            url: '../../indexed/park_service/park_service',
        });
    },
    //工商财税
    property_services: function() {
        wx.navigateTo({
            url: '../../consult/business_tax/business_tax',
        });
    },
    //知识产权
    platform: function() {
        wx.navigateTo({
            url: '../../consult/intellectual/intellectual_index/intellectual_index',
        });
    },
    //政策推广
    equip_enter: function() {
        wx.navigateTo({
            url: '../../consult/policies/policies',
        });
    },
    //培训会展
    equip_rent: function() {
        wx.navigateTo({
            url: '../../consult/exhibition/exhibition',
        });
    },
    //技术转移
    transformation: function() {
        wx.navigateTo({
            url: '../../consult/transfer/transfer',
        });
    },
    // 科技服务
    technology: function() {
        wx.navigateTo({
            url: '../../consult/technologys/technoligys',
        });
    },
    //金融服务
    pay: function() {
        wx.navigateTo({
            url: '../../consult/financial/financial',
        });
    },
    //国际合作
    conference_officer: function() {
        wx.navigateTo({
            url: '../../consult/cooperation/cooperation',
        });
    },
    //仪器共享
    sharing: function() {
        wx.navigateTo({
            url: '../../indexed/instrument_share/instrument_share',
        });
    },
    // 下拉刷新
    onPullDownRefresh: function() {
        wx.showLoading({
            title: '正在加载',
        })
        this.onLoad();
        setTimeout(function() {
            wx.hideLoading();
        }, 1000);
        wx.stopPullDownRefresh();
    },
    //园区选择弹框
    switchpark: function() {
        var that = this;
        that.setData({
            zhe: true,
            scroll: false
        })
    },
    
    zhehide: function(){
        var that = this;
        that.setData({
            zhe: false,
            scroll: true,
        })
    },
    //查看更多
    searchmore: function() {
        wx.switchTab({
            url: '../../news/new_index/new_index',
        });
    },
    //资讯详情
    news: function(e) {
        var $id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../../news/new_detail/new_detail?news_id=' + $id
        });
    }
})