var app = getApp();
Page({
    data: {
        patent:[]
    },
    onShow: function (options) {
        var that = this;
        wx.request({
            url: app.data.host + '/api/Patent/patent',
            data: {
                park_id: wx.getStorageSync('park_id'),
            },
            success: function (msg) {
                if (msg.statusCode == 200 && msg.data.code == 200) {
                    that.setData({
                        patent: msg.data.data
                    })
                }
            }
        })
    },
    apatent: function(){
        wx.showToast({
            title: '申请成功，待审核',
            icon: 'success',
            duration: 2000
        })
    }
})