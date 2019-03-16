var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()  
Page({
    data: {
        host: app.data.host,//域名
        house: '',
    },
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: app.data.host +'/api/Enterprise/enterpriseDetails',
            data: {
                enterprise_id: options.house_id
            },
            success(res) {
                if (res.statusCode == 200) {
                    var housecon = res.data.content;
                    that.setData({
                        house: res.data
                    });
                    WxParse.wxParse('housedetails', 'html', housecon, that, 0);
                }
            }
        })
    },
    // 确认预约
    appointment: function () {
        wx.showToast({
            title: '预约成功',
            icon: 'succes',
            duration: 1000,
            mask: true
        })
    },
})