// wo/employee/employee.js
Page({
    data: {
        height: 0,
        edit: true
    },
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    height: res.windowHeight
                })

            }

        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    edit: function(){
        var that = this;
        that.setData({
            edit: false
        });
    },
    noedit:function(){
        var that = this;
        that.setData({
            edit: true
        });
    }
})