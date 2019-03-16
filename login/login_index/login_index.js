const app = getApp();
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {
        var that = this;
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (e) {
                            wx.login({
                                success: res => {
                                    var code = res.code;
                                    if (e.errMsg == "getUserInfo:ok") {
                                        var rawData = e.rawData;
                                        var signature = e.signature;
                                        var encryptedData = e.encryptedData;
                                        var iv = e.iv;
                                        wx.request({
                                            url: app.data.host + '/api/Login/login',
                                            data: {
                                                "code": code,
                                                "rawData": rawData,
                                                "signature": signature,
                                                'iv': iv,
                                                'encryptedData': encryptedData
                                            },
                                            method: 'POST',
                                            success: function (res) {
                                                wx.setStorageSync('userinfo', res.data.message);
                                            }
                                        });
                                    }
                                }
                            });
                            wx.switchTab({
                                url: '/indexed/home/home'
                            })
                        }
                    });
                }
            }
        })
    },
    bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            wx.login({
                success: res => {
                    var code = res.code;
                    if (e.detail.errMsg == "getUserInfo:ok") {
                        var rawData = e.detail.rawData;
                        var signature = e.detail.signature;
                        var encryptedData = e.detail.encryptedData;
                        var iv = e.detail.iv;
                        wx.request({
                            url: app.data.host + '/api/Login/login',
                            data: {
                                "code": code,
                                "rawData": rawData,
                                "signature": signature,
                                'iv': iv,
                                'encryptedData': encryptedData
                            },
                            method: 'POST',
                            success: function (res) {
                               
                                console.log(res);
                                wx.setStorageSync('userinfo', res.data.message);
                           
                            }
                        });
                    }
                }
            });
            //授权成功后，跳转进入小程序首页
            wx.switchTab({
                url: '/indexed/home/home'
            })
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    }
                }
            })
        }
    }
})