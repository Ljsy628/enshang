var app = getApp();
Page({
    data: {
        host: app.data.host, //域名
        casArray: [], //行业数据
        casIndex: 0, //行业下标
        casArrayId: [], //行业id
        categoryList:[],//类目数据源
        categoryIndex:0,//类目下标
        categoryId:[]//类目id
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // 所属行业
        wx.request({
            url: app.data.host + "/api/Industry/industryList",
            success(res) {
                if (res.statusCode == 200) {
                    var $title = res.data[1];
                    var $ids = res.data[0];
                    that.setData({
                        casArray: $title,
                        casArrayId: $ids,
                        nowHistoryId: $ids[that.data.casIndex]
                    });
                }
            }
        })
        // 商标类目
        wx.request({
            url: app.data.host + "/api/Brand/beandClass",
            success(res) {
                if (res.statusCode == 200) {
                    var $ids = res.data.id;
                    var $brand = res.data.brand;
                    that.setData({
                        categoryList:$brand,
                        categoryId:$ids,
                        nowcategoryId:$ids[that.data.categoryIndex]
                    });
                }
            }
        })
    },
    // 行业切换选择
    bindCasPickerChange: function (e) {
        var $index = e.detail.value; //最终下标
        this.setData({
            casIndex: $index,
            nowHistoryId: this.data.casArrayId[$index]
        })
    },
    // 类目切换选择
    categoryChange: function (e) {
        var $index = e.detail.value; //最终下标
        this.setData({
            categoryIndex: $index,
            nowcategoryId: this.data.categoryId[$index]
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    register: function(e){
        var that = this;
        var name = e.detail.value.name;
        var person = e.detail.value.person;
        var tel = e.detail.value.tel;
        var industry_id = this.data.nowHistoryId; //行业id
        var type_id = this.data.nowcategoryId
        wx.request({
            url: app.data.host + "/api/Brand/register",
            data: {
                name:name,
                user_name: person,
                tel:tel,
                industry_id: industry_id,
                id: type_id
            },
            method: 'POST',
            success: function(res) {
                
            },
        })

    }
})