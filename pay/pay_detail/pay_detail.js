var app = getApp()
Page({
    data: {
        casArray: ['半年', '一年'],//费用月数
        costType:[],//费用类型
        costTypeId:[],
        typeIndex: 0,  //默认费用类型下标
        Gender: 'female',
        casIndex: 0,  //默认缴费月数下标
        showModal: false,
        $custui:0, //选中其他  设置自定义价格
        $now_price:0,  //当前价格
        $index:null,
        nowTypeId:0,  //默认费用类型id
        nowTypeName:'', //默认费用类型名称
        nowMonth:'', //默认缴费月数
    },
    onLoad:function() {
      var that = this;
      //费用类型
      wx.request({
        url: app.data.host +'/api/Userpayment/paymentList',
        success:function(msg) {
          if(msg.statusCode == 200 && msg.data.code == 200) {
            that.setData({
              costTypeId:msg.data.data.id,
              costType:msg.data.data.name,
              nowTypeId: msg.data.data.id[that.data.casIndex],
              nowTypeName: msg.data.data.name[that.data.casIndex],
              nowMonth: that.data.casArray[that.data.casIndex]
            })
          }
        }
      })
    },
    bindCasPickerChange: function (e) {//缴费约束切换
        this.setData({
            casIndex: e.detail.value,
          nowTypeId: this.data.costTypeId[e.detail.value],
          nowTypeName: this.data.costType[e.detail.value],
        })
    },
    bindTypePickerChange: function (e) {//费用类型切换
        this.setData({
            typeIndex: e.detail.value,
          nowMonth:this.data.casArray[e.detail.value]
        })

    },
    showDialogBtn: function () {
        this.setData({
            showModal: true
        })
    },
    //提交按钮
    online_pay: function(){
      var useinfo = wx.getStorageSync('userinfo');
      var that = this;
      var $price = that.data.$now_price;  //缴费金额
      var $type = that.data.nowTypeName;  //费用类型
      var $type_id = that.data.nowTypeId; //费用类型id
      // var $month = that.data.nowMonth; //缴费月数Œ
      wx.request({
        url: app.data.host +'/api/Pay/pay',
        data:{
          user_id: useinfo.id,
          price:$price,
          openid:useinfo.openid,
          type_name:$type,
          type_id:$type_id
        },
        method:'POST',
        success:function(msg) {
          if(msg.statusCode != 200 ) {
            return false;
          }
          var $data = msg.data;
          wx.requestPayment({
            timeStamp: $data.timeStamp+"",
            nonceStr: $data.nonceStr,
            package: "prepay_id="+$data.prepay_id,
            signType: 'MD5',
            paySign: $data.paySign,
            success(res) {
              if (res.errMsg == "requestPayment:ok") {
                wx.request({
                  url: app.data.host +'/api/Pay/updateOrderStatus',
                  data:{
                    order_no: $data.order_no,
                    price:$price
                  },
                  success:function(msg) {
                    if(msg.statusCode == 200 && msg.data.code == 200) {
                      wx.showToast({
                        title: msg.data.message,
                        duration: 1000,
                        mask: true
                      });
                    }else{
                      wx.showToast({
                        title: msg.data.message,
                        duration: 1000,
                        mask: true
                      });
                    }
                  }
                })
              } else if (res.errMsg == 'requestPayment:fail cancel'){
                wx.showToast({
                  title: "您已取消支付",
                  duration: 1000,
                  mask: true
                });
              }
             },
            fail(res) { 
              wx.showToast({
                title: "您已取消支付",
                icon:"none",
                duration: 1000,
                mask: true
              });
            }
          })
        }
      })
        // wx.navigateTo({
        //     url:'../../pay/online_pay/online_pay'
        // })
    },
  choose_price:function(e) {
    var that = this;
    var $price = e.currentTarget.dataset.money; // 金额
    var $index = e.target.dataset.index;
    
    that.setData({
      $index: $index
    })
    if($index != 7) {
      that.setData({
        $now_price:$price
      })
    }
  },
  focusPirce:function(e) {
    var $price = e.detail.value;
    this.setData({
      $now_price:$price,
      $index: 7
    })
  }
})