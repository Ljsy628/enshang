// pages/choose/choose.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        $data:[],
        $host:app.data.host
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: app.data.host+'/api/Equipment/equipmentListTwo',
            data:{
                park_id: app.data.park_id
            },
            success: function (msg) {
                if(msg.data.code != undefined && msg.data.code == 201 ) {
                }else{
                    that.setData({
                        $data:msg.data
                    })
                }

            }
        });
    },

    //下拉加载
    pullUpLoad: function () {
        var that = this;
        if (!that.data.hidden) {
            that.data.params.pageNo += 1;
            that.setData({
                params: that.data.params,
            })
            if (that.data.params.pageNo <= that.data.totalPages) {
                that.setData({
                    hidden: true,
                })
                that.getShareList();
            } else {
                that.setData({
                    hidden: false,
                })
            }
        }
    },
    detail_btn: function (e) {
        var $id = e.target.id;
        wx.navigateTo({
            url: '../../equip_share/share_detail/share_detail?e_id='+$id,
        });
    },
})