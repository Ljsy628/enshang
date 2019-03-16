var app = getApp() 
Page({
    data: {
        conference: '',
        host: app.data.host,//域名
    },
    onLoad: function () {
        var that = this;
        wx.request({
            url: app.data.host + "/api/meeting/meetingList",
            data:{
                park_id: wx.getStorageSync('park_id')
            },
            success(res) {
                if (res.statusCode == 200 && res.data.code == 200) {
                    that.setData({
                        conference: res.data.data
                    });

                }
            }
        }) 
    },
    office_detail:function(e){
        var $id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../../conference_officer/office_detail/office_detail?meet_id=' + $id
        });
    }
})