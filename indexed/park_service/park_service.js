// indexed/park_service/park_service.js
var app = getApp()
Page({

        /**
         * 页面的初始数据
         */
        data: {
                Width: 0,
                Height: 0,
                userinfo:wx.getStorageSync('userinfo'),
                host: app.data.host
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function(options) {
                // 大盒子的高
                var that = this;
                const query = wx.createSelectorQuery()
                query.select('#content').boundingClientRect()
                query.selectViewport().scrollOffset()
                query.exec(function(res) {
                        that.setData({
                                'Width': (wx.getSystemInfoSync().windowWidth) / 2 - 1,
                                'Height': (res[0].height - 3) / 4,
                                'Heights': (res[0].height - 3) / 3
                        })
                })
                // end
        },
        // 园区介绍
        park_profile: function() {
                wx.navigateTo({
                        url: '../../indexed/park_profile/park_profile',
                });
        },
        // 入驻申请
        enter_apply: function() {
                var that = this;
                // 入驻申请首页接口
                wx.request({
                        url: app.data.host + "/api/Business/basic",
                        data: {
                            user_id: that.data.userinfo.id,
                            park_id: wx.getStorageSync('park_id'),
                        },
                        success(res) {
                                if (res.statusCode == 200) {
                                        if (res.data.code == 203) {
                                                wx.showToast({
                                                        title: '请勿重复提交',
                                                        icon: 'none',
                                                        duration: 1000,
                                                        mask: true
                                                })
                                                return false;
                                        } else if (res.data.code == 201) {
                                                wx.showToast({
                                                        title: '请继续完善信息',
                                                        icon: 'none',
                                                        duration: 1000,
                                                        mask: true
                                                })
                                                setTimeout(function() {
                                                        wx.navigateTo({
                                                                url: '../../enterprise_enter/material/material?id=' + res.data.id
                                                        });
                                                },1200)
                                                
                                        } else if(res.data.code == 202) {
                                                wx.navigateTo({
                                                        url: '../../enterprise_enter/enter_apply/enter_apply'
                                                });
                                        }
                                }
                        }
                })

        },
        // 费用缴纳
        pay_index: function() {
                wx.navigateTo({
                        url: '../../pay/pay_detail/pay_detail',
                });
        },
        // 会议服务
        conference_officer: function() {
                wx.navigateTo({
                        url: '../../conference_officer/office_show/office_show',
                });
        },
        // 设备共享
        equip_share: function() {
                wx.navigateTo({
                    url: '../../equip_rent/equip_rent/equip_rent',
                });
        },
        // 物业服务
        property_services: function() {
                wx.navigateTo({
                        url: '../../property_services/property_services/property_services',
                });
        },
        //专业设备
        rent: function() {
                wx.navigateTo({
                        url: '../../equip_rent/equip_rent/equip_rent',
                });
        },
        //房源列表
        listings: function() {
                wx.navigateTo({
                        url: '../../indexed/listings/listings',
                });
        }
})