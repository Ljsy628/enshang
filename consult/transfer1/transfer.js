var app = getApp()
Page({
    data: {
        currentTab: 0,
        Height: wx.getSystemInfoSync().windowHeight - 85
    },
    onLoad: function (options) {

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
    demand: function () {
        wx.navigateTo({
            url: '../../consult/demand/demand',
        });
    },
    achievement: function () {
        wx.navigateTo({
            url: '../../consult/achievement/achievement',
        });
    },
    makeover: function () {
        wx.navigateTo({
            url: '../../consult/assignment/assignment',
        });
    },
})

