var WxParse = require('../../wxParse/wxParse.js');
var app = getApp() 
Page({
    data: {
        num: 1,
        minusStatus: 'disabled',
        imgkey:'',
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        inputShowed: false,
        inputVal: "",
        casArray: ['一年', '半年'],
        casIndex: 0,
        meetdetail:[],
        host: app.data.host,
        officeDetail:''
    },
    onLoad: function (options) {
        var that = this;
        var meet_id = options.meet_id;
        wx.request({
            url: app.data.host + '/api/meeting/meetingDetail',
            data: {
                meeting_id: meet_id
            },
            success(res) {
                if (res.statusCode == 200 && res.data.code ==200) {
                    var officecon = res.data.data.content;
                    that.setData({
                        meetdetail: res.data.data
                    });
                    WxParse.wxParse('officeDetail', 'html', officecon, that, 0);
                }
            }
        })
    },
    bindCasPickerChange: function (e) {//还回周期
        this.setData({
            casIndex: e.detail.value
        })
    },
    // 预约会议
    subscribe: function () {
        wx.showToast({
            title: '预约成功',
            icon: 'succes',
            duration: 1000,
            mask: true
        })
    }
})