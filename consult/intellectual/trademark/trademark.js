var app = getApp()

Page({
    data: {
        host: app.data.host, //域名
        transferList: [],
    },
    onLoad: function (options) {
        // var that = this;
        // wx.request({
        //     url: app.data.host + "/api/Brand/transferList",
        //     success(res) {
        //         if (res.statusCode == 200) {
        //             that.setData({
        //                 transferList: res.data
        //             });
        //         }
        //     }
        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      var that = this;
      wx.request({
        url: app.data.host + "/api/Brand/transferList",
        data: {
          park_id: wx.getStorageSync('park_id'),
        },
        success(res) {
          console.log(res.data);
          if (res.statusCode == 200) {
            that.setData({
              transferList: res.data
            });
          }
        }
      })
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