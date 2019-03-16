var app = getApp()
Page({
    data: {
        currentTab: 0,
        policieList: [], //申报类别
        policieIndex: 0, //申报下标
        policieId: [], //申报id
        advertisementList:[],
    },
    onLoad: function (options) {
        var that = this;
        that.changePolicie(1);
        //分类
        wx.request({
            url: app.data.host + "/api/Policycate/cateList",
            success(res) {
                if (res.statusCode == 200 &&res.data.code == 200) {
                    that.setData({
                        policieList:res.data.name,
                        policieId:res.data.id,
                        nowType: res.data.id[that.data.policieIndex]
                    });
                }
            }
        })
    },
    // 申报类别切换
    policieChange: function (e) {
        var $index = e.detail.value; //最终下标
        this.setData({
            policieIndex: $index, 
            nowType: this.data.policieId[$index]           
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
    //切换政策解读子分类
    changePolicie:function(e) {
        if(e == 1) {
            var $id = 1;
        }else{
            var $id = e.currentTarget.dataset.id;
        }
        var that = this;
        $id = $id < 1 || $id == undefined ? 1 : $id;
        wx.request({
            url: app.data.host +'/api/Policy/policyList',
            data:{
                type_id:$id,
                park_id: wx.getStorageSync('park_id')
            },
            success:function(msg) {
                if(msg.statusCode == 200 && msg.data.code == 200) {
                    that.setData({
                        advertisementList:msg.data.data,
                        nowChecked: $id
                    })
                }
            }
        })
    },
    declare: function (e) {
        var that = this;
        var commpany = e.detail.value.commpany;//企业名称
        var tel = e.detail.value.tel;//联系方式
        var type = that.data.nowType;//申报类别
        var user_id = wx.getStorageSync('userinfo').id;
        wx.request({
            url: app.data.host + '/api/Policy/policyAdd',
            data: {
                 name:commpany,
                 tel:tel,
                 type:type,
                 user_id:user_id
            },
            method:'POST',
            success: function (res) {
                if(res.statusCode == 200 && res.data.code == 200) {
                    wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        duration: 1200,
                        mask: true,
                    })
                }else{
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                        duration: 1200,
                        mask: true,
                    })
                }
                

            }
        })

    },
    polocy_detail:function(){
        wx.navigateTo({
            url: '../../consult/polocies_detail/policies_detail',
        })
    }
})

