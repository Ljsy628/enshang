var app = getApp()
Page({
    data: {
        host: app.data.host, //域名
        patentList:[],
        array: ['专利分类1', '专利分类2', '专利分类3', '专利分类4'],
        index:0
    },
    onShow: function (options) {
        var that = this;
        wx.request({
            url: app.data.host + '/api/Patent/patentList',
            data: {
              park_id: wx.getStorageSync('park_id'),
            },
            success(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        patentList: res.data
                    });
                }
            }
        })
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
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