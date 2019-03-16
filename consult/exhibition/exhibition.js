var app = getApp()
Page({
    data: {
        currentTab: 0,
        Height: wx.getSystemInfoSync().windowHeight - 85,
        host: app.data.host,//域名
        teacher:[],//创业导师数据源
        plan:[],//培训方案数据源
        organization:[],//服务机构数据源 

    },
    onLoad: function (options) {
      console.log(wx.getStorageSync('userinfo'))
        var that = this;
            // 创业导师接口
        wx.request({
            url: app.data.host + "/api/Teacher/teacherList",
          data: {
            park_id: wx.getStorageSync('park_id'),
          },
            success(res) {
                if (res.statusCode == 200 && res.data.code == 200) {
                    that.setData({
                        teacher: res.data.data
                    });
                }
            }
        })
            //培训方案接口
        wx.request({
            url: app.data.host + "/api/Plan/planList",
            success(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        plan: res.data.data.plan,
                        cate:res.data.data.cate
                    });
                    
                }
            }
        });
        //服务机构接口
        wx.request({
            url: app.data.host + "/api/Institutions/InstitutionsList",
            data:{
                type_id:2
            },
            method:'get',
            success(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        organization:res.data
                    });

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
    account: function () {
        wx.navigateTo({
            url: '../../consult/account/account',
        });
    },
    // 指导申请
    guide:function(e){
        var that = this;
        var userID = wx.getStorageSync('userinfo').id;
        var teacher_id = e.currentTarget.dataset.id;
      console.log(wx.getStorageSync('userinfo'))
        wx.request({
            url: app.data.host + "/api/Teacher/planAdd",
            data: {
                teacher_id: teacher_id,
                user_id: userID
            },
            method: 'post',
            success(res) {
                wx.showToast({
                    title: '申请成功待审核',
                    icon: 'success',
                    duration: 1000,
                    mask: true
                })
            }
        });
    }
})

