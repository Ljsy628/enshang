// consult/intellectual/copyright/copyright.js
var app = getApp()  
Page({

    /**
     * 页面的初始数据
     */
    data: {
      copyrightList:"",//信息列表
      host: app.data.host,//域名
      clear:[],//数据清洗

    },
    uploads(e){
      console.log(e)
      console.log(wx.getStorageSync('userinfo'))
      wx.request({
        url: app.data.host + '/api/Activist/copyrightAdd',
        type:"post",
        data:{
          user_id: wx.getStorageSync('userinfo').id,
          copyright_id:"",
          park_id: wx.getStorageSync('park_id')
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(wx.getStorageSync('userinfo'))
      var that= this;
      wx.request({
        url: app.data.host +'/api/Copyright/copyrightList',
        data:{
          park_id: wx.getStorageSync('park_id'),
        },
        success(res){
          if(res.data.code===200){
            console.log(res)
            
            for (var i in res.data.data.cate){
              res.data.data.cate[i].result = []
              that.data.clear.push(res.data.data.cate[i])
              
              for (var b in res.data.data.result){
                if (res.data.data.result[b].type === res.data.data.cate[i].id){
             
                  console.log(res.data.data.cate[i].result.push(res.data.data.result[b]))
                }
              }
            }
            
            that.setData({
              copyrightList:res.data.data,
              clear: that.data.clear
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