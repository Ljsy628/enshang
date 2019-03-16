Page({
    data: {
        userinfo: []
    },
    onLoad: function () {
        var userinfo = wx.getStorageSync('userinfo');
      console.log(wx.getStorageSync('userinfo'))
        this.setData({
            userinfo: userinfo
        })
        console.log(this.data)
    },
    //二维码
    mycode: function () {
        wx.navigateTo({
            url: '../../wo/employee/employee',
        });
    },
    //机构
    organization: function () {
        wx.navigateTo({
            url: '../../wo/organization/organization',
        });
    },
    // 发布需求
    demand: function () {
        wx.navigateTo({
            url: '../../wo/post_demand/post_demand',
        });
    },
    // 缴费记录
    payment: function () {
        wx.navigateTo({
            url: '../../wo/payment/payment',
        });
    },
    // 预约记录
    reservation: function () {
        wx.navigateTo({
            url: '../../wo/reservation/reservation',
        });
    },
    // 知识产权
    intellectual: function () {
        wx.navigateTo({
            url: '../../consult/intellectual/intellectual_index/intellectual_index',
        });
    },
    // 名片
    cardcase: function () {
        wx.navigateTo({
            url: '../../wo/employee/employee',
        });
    },
    // 申请记录
    applcode: function () {
        wx.navigateTo({
            url: '../../wo/applcode/applcode',
        });
    },
})