var app = getApp() 
Page({
  data: {
      host: app.data.host,//域名
      property:'',
      article:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
      var that = this;
      wx.request({
          url: app.data.host + "/api/Property/PropertyList",
          data: {
              park_Id: app.data.park_id
          },
          success(res) {
            if (res.statusCode == 200 && res.data.code == 200) {
                if (res.data.data.content.length > 0) {
                    that.setData({
                        property: res.data.data
                    });
                    if(res.data.data.Project.length > 0) {
                        that.setData({
                            article: res.data.data.Project
                        });
                    }
                }else{
                    wx.showToast({
                        title: '该园区暂无物业服务',
                        icon:'none'
                    })
                }
            } else {
                wx.showToast({
                    title: '该园区暂无物业服务',
                    icon: 'none'
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

  }
})