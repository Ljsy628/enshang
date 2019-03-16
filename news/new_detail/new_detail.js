var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({
    data: {
        host: app.data.host,//域名
        newdetail:''
    },
    onLoad: function (options) {
        var that = this;
        var news_id = options.news_id;
        wx.request({
            url: app.data.host + '/api/News/details',
            data: {
                newsid: news_id
            },
            success(res) {
                if (res.statusCode == 200) {
                    var $content = res.data.content;
                    that.setData({
                        newdetail: res.data
                    });
                    WxParse.wxParse('newdetails', 'html', $content, that, 0);
                }
            }
        })
    },
})