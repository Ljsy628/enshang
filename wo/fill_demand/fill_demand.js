// wo/fill_demand/fill_demand.js
var app = getApp();
Page({
    data: {
        content:'', //内容
        flag:true
    },
    onLoad: function(options) {

    },
    getContent:function(e) {
        var $content = e.detail.value;
        this.setData({
            content:$content
        })
    },
    sure_demand: function(e) {
        var $flag = this.data.flag;
        if (!$flag) {
            return false;
        }
        this.setData({
            flag:false
        })
        var that = this;
        var user_id = wx.getStorageSync('userinfo').id;
        var comname = e.detail.value.comname;
        var tel = e.detail.value.tel;
        var needetail = that.data.content;
        if (comname == '') {
            wx.showToast({
                title: '企业名称不能为空',
                icon: 'none',
                duration: 10000,
                mask: true
            });
            setTimeout(function() {
                wx.hideToast()
            }, 2000);
            this.setData({
                flag: true
            })
        } else {
            var $arr = {};
            $arr['user_id'] = wx.getStorageSync('userinfo').id;
            $arr['company_name'] = comname;
            $arr['tel'] = tel;
            $arr['content'] = needetail;
            wx.request({
                url: app.data.host + "/api/Demand/publishDemand",
                data: $arr,
                method: "POST",
                success(res) {
                    if(res.statusCode == 200 && res.data.code == 200) {
                        wx.showToast({
                            title: '发布成功',
                            duration: 1500,
                            mask: true
                        });
                        that.setData({
                            flag: true
                        })
                        wx.redirectTo({
                            url: '../../wo/post_demand/post_demand',
                        });
                    }else{
                        wx.showToast({
                            title: '发布失败',
                            icon: 'none',
                            duration: 1500,
                            mask: true
                        });
                        that.setData({
                            flag: true
                        })
                        return false;
                    }
                }
            })
            
        }
    }
})