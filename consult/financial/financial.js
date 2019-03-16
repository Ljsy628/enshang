var app = getApp()
Page({
    data: {
        finIndex: 0,
        currentTab: 0,
        Height: wx.getSystemInfoSync().windowHeight-30,
        indexa: true,
        indexb: false,
        indexc: true,
        indexd: false,
        indexe: true,
        indexf: false,
        indexg: true,
        indexh: false,
        userinfo: wx.getStorageSync('userinfo'),
        host: app.data.host,
        organization: []
    },
    onLoad: function (e) {
        var that = this;
        // 挂牌交易等接口
        wx.request({
            url: app.data.host + "/api/Technology/technologyList",
          data: {
            park_id: wx.getStorageSync('park_id'),
          },
            success(res) {
                if (res.statusCode == 200 && res.data.code == 200) {
                    that.setData({
                        deal: res.data.data
                    });
                }
            }
        })
        //服务机构接口
        wx.request({
            url: app.data.host + "/api/Institutions/InstitutionsList",
          data: { type_id: 3, park_id: wx.getStorageSync('park_id'),},
            method:'get',
            success(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        organization: res.data
                    });
                }
            }
        })
        // 默认显示所属行业
        wx.request({
            url: app.data.host + "/api/Industry/industryList",
            data: {
              park_id: wx.getStorageSync('park_id'),
            },
            success(res) {
                if (res.statusCode == 200) {
                    var $title = ['请选择..'];
                    $title.push.apply($title,res.data[1]);
                    var $ids = [0];
                    $ids.push.apply($ids,res.data[0]);
                    that.setData({
                        finType: $title,
                        tradeId: $ids,
                        nowId: $ids[that.data.finIndex]
                    });
                }
            }
        })
    },
    bindTypePickerChange: function (e) {//所属行业切换
        var choIndex = e.detail.value;//获取当前值下标
        this.setData({
            finIndex: choIndex,  //前台反馈当前下标
            nowId: this.data.tradeId[choIndex]
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
    del: function () {
        wx.navigateTo({
            url: '../../consult/transaction/transaction',
        });
    },
    claimer_btna: function () {
        var that = this;
        that.setData({
            indexa: false,
            indexb: true
        })
    },
    claimer_btnb: function () {
        var that = this;
        that.setData({
            indexc: false,
            indexd: true
        })
    },
    claimer_btnc: function () {
        var that = this;
        that.setData({
            indexe: false,
            indexf: true
        })
    },
    claimer_btnd: function () {
        var that = this;
        that.setData({
            indexg: false,
            indexh: true
        })
    },
    applic: function(e){
        var that = this;
        var user_id = that.data.userinfo.id;
        var comname = e.detail.value.comname;//企业名称
        var money = e.detail.value.money;//融资金额
        var people = e.detail.value.people;//联系人
        var tel = e.detail.value.tel;//联系方式
        var pattern = e.detail.value.pattern//投融资方式
        var industry = that.data.nowId;
        if(industry < 1) {
            wx.showToast({
                title: '请选择所属行业',
                duration: 1500,
                mask: true
            })
        }
        return false;
        
        // 投融资申请
        wx.request({
            url: app.data.host + "/api/Demand/publishDemand",
            data: {
                user_id : user_id,
                name : comname,
                money : money,
                user_name : people,
                tel: tel,
                financing: pattern
            },
            method: "POST",
            success(res) {

            }
        })
        wx.showToast({
            title: '发布成功',
            icon: 'succes',
            duration: 1500,
            mask: true
        })
    }
})

