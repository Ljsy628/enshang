// wo/payment/payment.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      $data:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var $userinfo = wx.getStorageSync('userinfo');
      var that = this;
       wx.request({
         url: app.data.host +'/api/Userpayment/recordList',
         data: { user_id: $userinfo.id},
         success:function(msg) {
            if(msg.statusCode == 200 && msg.data.code == 200) {
              if(msg.data.data.length < 1) {

                  
              }
              that.setData({
                $data:msg.data.data
              });
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
    onShow: function () {

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

    },
    payment_detail: function () {
        // wx.navigateTo({
        //     url: '../../wo/payment_detail/payment_detail',
        // });
    },
})