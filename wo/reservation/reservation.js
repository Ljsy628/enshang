var app = getApp()
Page({
    data: {
        currentTab: 0,
        Height: wx.getSystemInfoSync().windowHeight-85,
        $meeting_data:[], //会议室记录
        $equipment_data:[], //设备记录 
        host:app.data.host
    },
    onLoad: function (options) {
      var that = this;
      // var $userinfo = wx.getStorageSync('userinfo');
      var $userinfo = [];
        $userinfo['id'] = 1;
       //会议室预约记录
        wx.request({
          url: app.data.host +'/api/Meeting/orderRecord',
          data: { user_id:$userinfo.id},
          success:function(msg) {
            if(msg.statusCode == 200 && msg.data.code == 200) {
                if(msg.data.data.length < 1) {
                  console.log(1111);return false;
                }else{
                  that.setData({
                    $meeting_data:msg.data.data
                  })
                }              
            }
          }
        });
      //设备预约记录
      wx.request({
        url: app.data.host + '/api/Equipment/EquipmentOrderRecord',
        data: { user_id: $userinfo.id },
        success: function (msg) {
          if (msg.statusCode == 200 && msg.data.code == 200) {
            if (msg.data.data.length < 1) {
              console.log(2222); return false;
            } else {
              that.setData({
                $equipment_data: msg.data.data
              })
            }
          }
        }
      });
    },
    //滑动切换
    swiperTab: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },
    //点击切换
    clickTab: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    res_btn: function () {
        wx.navigateTo({
            url: '../../wo/res_detail/res_detail',
        }); 
    }
})

