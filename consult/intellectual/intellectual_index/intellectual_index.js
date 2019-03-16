// consult/intellectual/intellectual.js
Page({
    data: {
        height: 0,
        width:0,
        WidthTop: 0,
        HeightTop: 0,
        // top的宽高
        heighta:0,
        heightb:0,
        widthb:0,
        heightc:0,
        heightd:0,
        heighte:0,
    },
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    height: res.windowHeight-20,
                    width: res.windowWidth - 20,
                    heighta: wx.getSystemInfoSync().windowHeight - 24,
                    heightb: (wx.getSystemInfoSync().windowHeight - 36) / 2,
                    widthb: (wx.getSystemInfoSync().windowWidth - 36) / 2,
                    heightc: (wx.getSystemInfoSync().windowHeight - 60) / 4,
                    heightd: ((wx.getSystemInfoSync().windowHeight - 60) / 4 - 90),
                    heighte: ((wx.getSystemInfoSync().windowHeight - 36) / 2 - 60) / 2,
                })
            }
        })    
    },
    //商标注册
    trade: function () {
        wx.navigateTo({
            url: '../../../consult/intellectual/trade/trade',
        })
    },
    //商标转让
    trademark: function () {
        wx.navigateTo({
            url: '../../../consult/intellectual/trademark/trademark',
        })
    },
    //服务机构
    instition: function () {
        wx.navigateTo({
            url: '../../../consult/intellectual/instition/instition',
        })
    },
    //专利申请
    apatent: function(){
        wx:wx.navigateTo({
            url: '../../../consult/intellectual/apatent/apatent',
        })
    },
    //专利转让
    patent: function(){
        wx: wx.navigateTo({
            url: '../../../consult/intellectual/patents/patents',
        })
    },
    //维权援助
    aid: function () {
        wx: wx.navigateTo({
            url: '../../../consult/intellectual/aid/aid',
        })
    },
    //版权登记
    copyright: function(){
        wx: wx.navigateTo({
            url: '../../../consult/intellectual/copyright/copyright',
        })
    }
})