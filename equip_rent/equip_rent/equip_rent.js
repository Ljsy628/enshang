// equip_rent/equip_rent/equip_rent.js
const app = getApp();
Page({
    data: {
        $data: [],
        $host: app.data.host
    },
    onLoad: function () {
        var that = this;
        wx.request({
            url: app.data.host + '/api/Equipment/equipmentList',
            data: {
                park_id: app.data.park_id
            },
            success: function (msg) {
                if (msg.data.code != undefined && msg.data.code == 201) {

                } else {
                    that.setData({
                        $data: msg.data
                    })
                }

            }
        });
    },
    detail_btn: function (e) {
        var $id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../../equip_rent/rent_detail/rent_detail?e_id=' + $id,
        });
    },
})