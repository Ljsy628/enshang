var app = getApp()
Page({
    data: {
        currentTab: 0,
        Height: wx.getSystemInfoSync().windowHeight - 30,
        host: app.data.host,//域名
        docking:[],//国际对接
        person:[],//人才引进
        project:[],//项目引进
        output:[]//技术输出
    },
    onShow: function (options) {
        var that = this;
        // 国际对接
        wx.request({
            url: app.data.host + "/api/Internationaljoint/jointList",
          data: {
            park_id: wx.getStorageSync('park_id'),
          },
            success(res) {
                if (res.statusCode == 200 && res.data.code == 200) {
                    that.setData({
                        docking: res.data.data
                    });
                }
            }
        })
        // 人才引进
        wx.request({
            url: app.data.host + "/api/Person/personList",
          data: {
            park_id: wx.getStorageSync('park_id'),
          },
            success(res) {
                if (res.statusCode == 200 && res.data.code == 200) {
                    that.setData({
                        person: res.data.data
                    });
                }
            }
        })
        // 项目引进
        wx.request({
            url: app.data.host + "/api/Application/appList",
          data: {
            park_id: wx.getStorageSync('park_id'),
          },
            success(res) {
                if (res.statusCode == 200 && res.data.code == 200) {
                    that.setData({
                        project: res.data.data
                    });
                }
            }
        })
        // 技术输出
        wx.request({
            url: app.data.host + "/api/Skill/skillList",
          data: {
            park_id: wx.getStorageSync('park_id'),
          },
            success(res) {
                if (res.statusCode == 200 && res.data.code == 200) {
                    that.setData({
                        output: res.data.data
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
    account: function () {
        wx.navigateTo({
            url: '../../consult/account/account',
        });
    }
})

