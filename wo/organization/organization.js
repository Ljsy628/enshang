var app = getApp();
Page({
    data: {
        host: app.data.host, //域名
        userinfo: [],
          },
    onLoad: function() {
        var that = this;
        var userinfo = wx.getStorageSync('userinfo');
        this.setData({
            userinfo: userinfo,
            sex: userinfo.sex
        })
    },
    //修改性别
    changeSex: function(e) {
        var $sex = e.detail.value;
        this.setData({
            sex: $sex
        })
    },
    //提交修改信息
    updateUserinfo: function(e) {
        var that = this;
        var $realname = e.detail.value.realname;
        var $tel = e.detail.value.tel;
        var $sex = that.data.sex;
        var $userinfo = that.data.userinfo;
        var $arr = {};
        if ($realname != undefined && $realname != '' && $realname != $userinfo.realname) {
            $arr['realname'] = $realname;
        }
        if ($sex != undefined && $sex != '' && $sex != $userinfo.sex) {
            $arr['sex'] = $sex;
        }
        if ($tel != undefined && $tel != '' && $tel != $userinfo.tel) {
            $arr['tel'] = $tel;
        }
        // if ($img != undefined && $img != '' && $img != $userinfo.img) {
        //     wx.uploadFile({
        //         url: app.data.host + '/api/user/updateUserImg',
        //         filePath: $img,
        //         name: 'thumb',
        //         header: {
        //             "Content-Type": "multipart/form-data"
        //         },
        //         formData: {
        //             'user_id': $userinfo.id
        //         },
        //         dataType: 'json',
        //         success:function(msg) {
        //             if(msg.statusCode == 200 ) {
        //                 if(msg.data == 202) {
        //                     wx.showToast({
        //                         title:'请求失败',
        //                         icon:"none"
        //                     })
        //                 }else if(msg.data == 203) {
        //                     wx.showToast({
        //                         title: '上传失败',
        //                         icon: "none"
        //                     })
        //                 } else if (msg.data == 201) {
        //                     wx.showToast({
        //                         title: '请选择上传图片',
        //                         icon: "none"
        //                     })
        //                 } else{
        //                     $userinfo.img = msg.data;
        //                     wx.setStorageSync('userinfo', $userinfo);
        //                     that.setData({
        //                         avatar: $userinfo.img,
        //                         userinfo:wx.getStorageSync('userinfo')
        //                     })
        //                     if (JSON.stringify($arr) == "{}") {
        //                         wx.showToast({
        //                             title: '头像更改成功'
        //                         });
        //                         that.onLoad();
        //                         return false;
        //                     }
        //                 }
        //             }else{
        //                 console.log('error');
        //             }
        //         }
        //     })
        // }
        
        if (JSON.stringify($arr) == "{}") {
            return false;
        }
        wx.request({
            url: app.data.host + '',
            data: $arr,
            success: function(res) {
                console.log(res);
            }
        })
    }
})