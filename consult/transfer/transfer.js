var app = getApp()
Page({
        data: {
                currentTab: 0,
                Height: wx.getSystemInfoSync().windowHeight - 30,
                need: [],
                host: app.data.host,
                generalize: [],
                generResults: [],
                transferList:[]
        },
        onLoad: function(options) {
                var that = this;
                //技术需求接口
                wx.request({
                        url: app.data.host + '/api/Demand/demandList',
                  data: {
                    park_id: wx.getStorageSync('park_id'),
                  },
                        success: function(msg) {
                                if (msg.statusCode == 200 && msg.data.code == 200) {
                                        that.setData({
                                                need: msg.data.data
                                        })
                                }
                        }
                });


                //成果推广接口
                wx.request({
                        url: app.data.host + '/api/result/resultList',
                  data: {
                    park_id: wx.getStorageSync('park_id'),
                  },
                        success(res) {
                                if (res.statusCode == 200 && res.data.code == 200) {
                                        that.setData({
                                                generalize: res.data.data.cate,
                                                generResults: res.data.data.result
                                        });
                                }
                        }
                })
                //技术转让接口
                wx.request({
                    url: app.data.host + '/api/Result/transfer',
                  data: {
                    park_id: wx.getStorageSync('park_id'),
                  },
                    success(res) {
                        if (res.statusCode == 200) {
                            that.setData({
                                transferList:res.data
                            });
                        }
                    }
                })
        },
        //滑动切换
        swiperTab: function(e) {
                var that = this;
                that.setData({
                        currentTab: e.detail.current
                });
        },
        //点击切换
        clickTab: function(e) {
                var that = this;
                if (this.data.currentTab === e.target.dataset.current) {
                        return false;
                } else {
                        that.setData({
                                currentTab: e.target.dataset.current
                        })
                }
        },
        demand: function() {
                wx.navigateTo({
                        url: '../../consult/demand/demand',
                });
        },
        achievement: function() {
                wx.navigateTo({
                        url: '../../consult/achievement/achievement',
                });
        },
        makeover: function() {
                wx.navigateTo({
                        url: '../../consult/assignment/assignment',
                });
        },
        //技术需求跳转详情页
        project_go: function(e) {
                var needid = e.currentTarget.dataset.id
                wx.navigateTo({
                        url: '../../collaborate/demand_detail/demand_detail?need=' + needid,
                });
        }
})