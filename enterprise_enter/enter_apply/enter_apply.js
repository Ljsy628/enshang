var app = getApp()
Page({
        data: {
                currentTab: 0,
                casArray: [], //行业数据
                casArrayId: [], //行业id
                casIndex: 0, //行业下标
                tempFilePaths: '',
                tempFilePaths: '',
                tempText: true,
                tempTexts: true,
                host: app.data.host, //域名
                house: '',
                userinfo: wx.getStorageSync('userinfo'),
                flow:[],
                Height: wx.getSystemInfoSync().windowHeight - 40,
        },
        onLoad: function() {
                var that = this;
                // 所属行业
          console.log(wx.getStorageSync('userinfo'))
                wx.request({
                        url: app.data.host + "/api/Industry/industryList",
                        success(res) {
                                if (res.statusCode == 200) {
                                        var $title = res.data[1];
                                        var $ids = res.data[0];
                                        that.setData({
                                                casArray: $title,
                                                casArrayId: $ids,
                                                nowHistoryId: $ids[that.data.casIndex]
                                        });
                                }
                        }
                })
            //申请流程接口
            wx.request({
                url: app.data.host + "/api/Business/process",
                success(res) {
                    if (res.statusCode == 200 && res.data.code == 200) {
                        that.setData({
                            flow: res.data.message
                        });
                    }
                }
            })
        },
        // 行业切换选择
        bindCasPickerChange: function(e) {
                var $index = e.detail.value; //最终下标
                this.setData({
                        casIndex: $index,
                        nowHistoryId: this.data.casArrayId[$index]
                })
        },
        //选项卡
        swiperTab: function(e) {
                this.setData({
                        currentTab: e.detail.current
                });
        },
        clickTab: function(e) {
                var that = this;
                if (this.data.currentTab === e.target.dataset.current) {
                        return false;
                } else {
                        that.setData({
                                currentTab: e.target.dataset.current
                        })
                }
        },
        // 详情
        appointment_deta: function() {
                wx.navigateTo({
                        url: '../appointment_deta/appointment_deta',
                });
        },
        //下一步
        commform: function(e) {
                var that = this;
                var industry_id = this.data.nowHistoryId; //行业id
                var user_name = e.detail.value.user_name; //姓名
                var tel = e.detail.value.tel; //电话
                var company_name = e.detail.value.company_name; //企业名称
                var city = e.detail.value.city; //所在地区
                var location = e.detail.value.location; //详细地址
                var company_tel = e.detail.value.company_tel; //公司电话
                wx.request({
                        url: app.data.host + "/api/Business/basic",
                        data: {
                                industry_id: industry_id,
                                user_name: user_name,
                                user_tel: tel,
                                company_name: company_name,
                                area_id: city,
                                address: location,
                                company_phone: company_tel,
                                user_id: that.data.userinfo.id
                        },
                        method: "POST",
                        success(res) {
                                if (res.statusCode == 200 && res.data.code == 200) {
                                        wx.navigateTo({
                                                url: '../../enterprise_enter/material/material?id=' + res.data.id
                                        });
                                }
                        }
                })

        },
      

})