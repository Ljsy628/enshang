var app = getApp()
Page({
    data: {
        currentTab: 0,
        Height: wx.getSystemInfoSync().windowHeight - 85,
        indexa: true,
        indexb: false,
        indexc: true,
        indexd: false,
        indexe: true,
        indexf: false,
        indexg: true,
        indexh: false,
        $data:[],
        host:app.data.host


    },
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: app.data.host + "/api/Technology/technologyList",
            success(res) {
                if (res.statusCode == 200 && res.data.code == 200) {
                    that.setData({
                        $data: res.data.data
                    });
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
    claimer_btna: function () {
        var that = this;
        that.setData({
            indexa: false,
            indexb: true
        })
    },
    claimer_btnb: function () {
        var that = this;
        that.setData({
            indexc: false,
            indexd: true
        })
    },
    claimer_btnc: function () {
        var that = this;
        that.setData({
            indexe: false,
            indexf: true
        })
    },
    claimer_btnd: function () {
        var that = this;
        that.setData({
            indexg: false,
            indexh: true
        })
    },


})

