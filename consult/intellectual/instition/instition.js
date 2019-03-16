var app = getApp()
Page({
    data: {
        host: app.data.host,
        instition:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
        var that = this;
        wx.request({
            url: app.data.host + '/api/Institutions/InstitutionsList',
            method: 'get',
            data: {
                type_id: 4,
                park_id: wx.getStorageSync('park_id'),
            },
            success: function (msg) {
                if (msg.statusCode == 200) {
                    that.setData({
                        instition: msg.data
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onLoad: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})