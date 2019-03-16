var app = getApp()
Page({
    data: {
        currentTab: 0,
        Height: wx.getSystemInfoSync().windowHeight-30 ,
        host: app.data.host,//域名
        demand_bot: true,
        demand_down: true,
        generType:'',//成果推广类型
        generResults:'',// 成果推广内容
        need:''//技术需求
        
    },
    onShow: function () {
        var that = this;
        //成果推广
        wx.request({
            url: app.data.host + '/api/result/resultList',
          data: {
            park_id: wx.getStorageSync('park_id'),
          },
            success(res) {
              console.log(res)
                if (res.statusCode == 200 && res.data.code == 200) {
                    that.setData({
                        generalize: res.data.data.cate,
                        generResults: res.data.data.result
                    });
                }
            }
        })
        //技术需求
        wx.request({
            url: app.data.host + '/api/patent/patentList',
          data: {
            park_id: wx.getStorageSync('park_id'),
          },
            success(res) {
                
                if (res.statusCode == 200 ) {
                    that.setData({
                        need:res.data
                    });
                }
            }
        })
        this.animation = wx.createAnimation({
            duration: 1000,
            delay: 100,
            success: function (res) {
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
    //技术需求跳转详情页
    project_go: function (e) {
        var needid = e.currentTarget.id
        wx.navigateTo({
            url: '../../collaborate/demand_detail/demand_detail?need='+needid,
        });
    },
    more: function(){
        var that = this;
        that.setData({
            demand_bot: false,
            demand_down: false
        })
    },
})

