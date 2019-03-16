var app = getApp()
Page({
    data: {
        host: app.data.host,//域名
        house: ''
    },
    onShow: function (options) {
        var that = this;
        wx.request({
            url: app.data.host + "/api/Enterprise/enterpriseList",
          data: {
            park_id: wx.getStorageSync('park_id'),
          },
            success(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        house: res.data
                    });
                }
            }
        })
    },
    // 详情
    appointment_deta: function (e) {
        var ids = e.currentTarget.id;
        wx.navigateTo({
            url: '../../enterprise_enter/appointment_deta/appointment_deta?house_id='+ids,
        });
    },
})