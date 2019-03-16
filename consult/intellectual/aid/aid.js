var app = getApp()
Page({
    data: {
        host: app.data.host, //域名
        safeguardList: ''
    },
    

    upload(){
        var that = this;
        wx.request({
            url: app.data.host +'/api/Activist/activistAdd',
            
            data:{

            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.request({
            url: app.data.host + '/api/Activist/patentList',
            data: {
              park_id: wx.getStorageSync('park_id'),
            },
            success(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        safeguardList: res.data
                    });
                }
                // if (res.statusCode == 201) {
                //     wx.showToast({
                //         title: '暂无数据',
                //         icon: 'none',
                //         duration: 1000,
                //         mask: true
                //     })
                // }
            }

        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }

})