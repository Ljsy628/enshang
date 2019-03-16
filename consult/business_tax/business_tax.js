var app = getApp()
Page({
    data: {
        currentTab: 0,
        Height: wx.getSystemInfoSync().windowHeight-30,
        host:app.data.host,
        $data:[],
        organization:[],
        accounting:[],
        flowList:[],
        datum:[],
        business:''
    },
    onLoad: function (options) {
        var that = this;
        // 注册流程
        wx.request({
            url: app.data.host + '/api/Company/companyList',
            data:{
              park_id: wx.getStorageSync('park_id'),
            },
            success: function (msg) {
                if (msg.statusCode == 200) {
                    that.setData({
                        flowList: msg.data.company,
                        datum: msg.data.material,
                        business: msg.data.companyScope
                    })
                }
            }
        })
        // 代理记账信息列表
        wx.request({
            url: app.data.host + '/api/Insteadaccount/account',
          data: {
            park_id: wx.getStorageSync('park_id'),
          },
            success: function (msg) {
                if (msg.statusCode == 200 && msg.data.code == 200) {
                    that.setData({
                        accounting: msg.data.data
                    })
                }
            }
        })
        //资质代办接口
        wx.request({
          url: app.data.host +'/api/Insteadaptitude/aptitudeList',
          data: {
            park_id: wx.getStorageSync('park_id'),
          },
          success:function(msg) {
            if(msg.statusCode == 200 && msg.data.code == 200) {
                that.setData({
                  $data:msg.data.data
                })
            }
          }
        })
        //服务机构接口
        wx.request({
            url: app.data.host + '/api/Institutions/InstitutionsList',
          data: {
            park_id: wx.getStorageSync('park_id'),
            type_id: 4,
          },
            method:'get',
            success: function (msg) {
                if (msg.statusCode == 200) {
                    that.setData({
                        organization: msg.data
                    })
                }
            }
        })
    },
    //滑动切换
    swiperTab: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },
    //点击切换
    clickTab: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    account: function () {
        wx.navigateTo({
            url: '../../consult/account/account',
        });
    },
    advisory: function(){
        wx.showToast({
            title: '提交成功',
            icon: 'succes',
            duration: 1000,
            mask: true
        })
    }
})

