var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({
    data: {
        num: 1,
        minusStatus: 'disabled',
        imgUrls: [],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        inputShowed: false,
        inputVal: "",
        date: '2018-12-18',
        $data:[],
        $host:app.data.host
    },
    onLoad: function (options) {
        var $id = options.share_id;  //设备id
        var that = this;
        wx.request({
            url: app.data.host +'/api/Equipment/details',
            data:{
                equiomentid: $id
            },
            success: function (msg) {
                if(msg.data.code != undefined && msg.data.code == 201) {
                
                }else{
                    var $content = msg.data.content
                    that.setData({
                        $data:msg.data,
                        imgUrls:msg.data.imgs
                    })
                    WxParse.wxParse('equipmentdetails', 'html', $content, that, 0);
                }

            }
        })
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    /* 点击减号 */
    bindMinus: function () {
        var num = this.data.num;
        // 如果大于1时，才可以减  
        if (num > 1) {
            num--;
        }
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 将数值与状态写回  
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },
    /* 点击加号 */
    bindPlus: function () {
        var num = this.data.num;
        // 不作过多考虑自增1  
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        var minusStatus = num < 1 ? 'disabled' : 'normal';
        // 将数值与状态写回  
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },
    /* 输入框事件 */
    bindManual: function (e) {
        var num = e.detail.value;
        // 将数值与状态写回  
        this.setData({
            num: num
        });
    },
    // 立即预约
    subscribe: function(e){
        var $id = e.target.dataset.id;
        wx.showToast({
            title: '预约成功',
            icon: 'succes',
            duration: 1000,
            mask: true
        })
        wx.redirectTo({
            url: '../../conference_officer/office_success/office_success',
        });
    }
})