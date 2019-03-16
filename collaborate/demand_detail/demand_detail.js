var app = getApp()
Page({
    data: {
        host: app.data.host,//域名
        needetail:''
    },
    onLoad: function (options){
        var that = this;
        var demandid = options.need;
        wx.request({
            url: app.data.host + '/api/Demand/demandDetail',
            data: {
                demand_id: demandid
            },
            method: 'get',
            success(res) {
                if (res.statusCode == 200 && res.data.code == 200) {
                    that.setData({
                        needetail: res.data.data
                    });
                }
            }
        })
    },
    //拨打电话
    phoneCall: function (res) {
        wx.makePhoneCall({
            phoneNumber: this.data.needetail.tel, 
            success: function () {
                
            },
            fail: function () {
                
            }
        })
    },
})