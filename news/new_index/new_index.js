var app = getApp()
Page({
    data: {
        currentTab: 0,
        //轮播图配置
        indicatorDots: true,  //显示面板指示点
        autoplay: true,     //自动切换
        interval: 3000,    //自动切换时间间隔
        duration: 1000,    //滑动动画时长
        Height:wx.getSystemInfoSync().windowHeight-280,
        host: app.data.host,//域名
        newhot:'',
        update:'',
        hot:'',
        newmin:'',
        slideshow:[]
    },
    onShow: function () {
        var that = this;
        //轮播图接口
        wx.request({
            url: app.data.host + '/api/News/newsImg',
            data: {
              parkid: wx.getStorageSync('park_id'),
            },
            success(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        slideshow: res.data
                    });
                }
            }
        })
        // 咨讯列表接口
        wx.request({
            url: app.data.host + '/api/News/newsList',
            data:{
              parkid: wx.getStorageSync('park_id'),
            },
            success(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        hot: res.data.hot,
                        newmin: res.data.new
                    });
                }
            }
        })
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
    // 下拉刷新
    onPullDownRefresh: function () {
        wx.showLoading({
            title: '正在加载',
        })
        this.onLoad();
        setTimeout(function () {
            wx.hideLoading();
        }, 1000);
        wx.stopPullDownRefresh();
    },
})

