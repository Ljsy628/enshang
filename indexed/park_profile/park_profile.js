var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({
    data: {
        host: app.data.host,//域名
        intro:''
    },
    onLoad: function () {
        var that = this;
        wx.request({
            url: app.data.host + "/api/Park/parkeDtails",
            data:{
                park_id: wx.getStorageSync('park_id')
            },
            success(res) {
                if (res.statusCode == 200 && res.data.code==200) {
                    var $content = res.data.data.content;
                    that.setData({
                        intro: res.data.data
                    });
                    WxParse.wxParse('parkintro', 'html', $content, that, 0);
                }
            }
        })
    },
})