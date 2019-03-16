var app = getApp()
Page({
        data: {
                currentTab: 0,
                tempFilePatha: '', //营业执照图片
                tempFilePathb: '', //营业执照图片
                tempFilePathc: '', //营业执照图片
                tempFilePathd: '', //营业执照图片
                tempText: true,
                tempTexts: true,
                host: app.data.host, //域名
                $arr:[],
        },
        onLoad: function(e) {
                var $id = e.id;
                this.setData({
                        business_id: $id
                })
        },
        //  上传营业执照
        chooseimage_a: function(e) {
                var _this = this;
                wx.chooseImage({
                        count: 1, // 默认9  
                        // 可以指定是原图还是压缩图，默认二者都有  
                        sizeType: ['original', 'compressed'],
                        sourceType: ['album', 'camera'],
                        success: function(res) {
                                _this.setData({
                                        tempFilePatha: res.tempFilePaths[0],
                                        tempText: false,
                                })
                        }
                })
        },
        chooseimage_b: function() {
                var _this = this;
                wx.chooseImage({
                        count: 1,
                        sizeType: ['original', 'compressed'],
                        sourceType: ['album', 'camera'],
                        success: function(res) {
                                _this.setData({
                                        tempFilePathb: res.tempFilePaths[0],
                                        tempTexts: false,
                                })
                        }
                })
        },
        chooseimage_c: function() {
                var _this = this;
                wx.chooseImage({
                        count: 1,
                        sizeType: ['original', 'compressed'],
                        sourceType: ['album', 'camera'],
                        success: function(res) {
                                _this.setData({
                                        tempFilePathc: res.tempFilePaths[0],
                                        tempTexts: false,
                                })
                        }
                })
        },
        chooseimage_d: function() {
                var _this = this;
                wx.chooseImage({
                        count: 1,
                        sizeType: ['original', 'compressed'],
                        sourceType: ['album', 'camera'],
                        success: function(res) {
                                _this.setData({
                                        tempFilePathd: res.tempFilePaths[0],
                                        tempTexts: false,
                                })
                        }
                })
        },
        commform: function(res) {
                var that = this;
                var $data = [];
                var $title = ['licence_face', 'licence_con', 'id_card_face', 'id_card_con'];
                var imgsra = this.data.tempFilePatha; //营业执照正面
                var imgsrb = this.data.tempFilePathb; //营业执照背面
                var imgsrc = this.data.tempFilePathc; //身份证人像面
                var imgsrd = this.data.tempFilePathd; //身份证国徽面
                var business_id = this.data.business_id;
                
                if (imgsra == '' || imgsrb == '' || imgsrc == '' || imgsrd == '') {
                        wx.showToast({
                                title: '请完善图片信息',
                                icon: 'none',
                                duration: 1000,
                                mask: true
                        })
                }
                wx.showLoading({
                        title: '正在提交中...',
                        mask: true
                });
                $data.push(imgsra, imgsrb, imgsrc, imgsrd);
                var $len = $data.length;
                var $i = 0;
                for (var i = 0; i < $len; i++) { 
                        var title = $title[i];
                        wx.uploadFile({
                                url: app.data.host + '/api/Business/detailed',
                                filePath: $data[i],
                                name: 'img',
                                header: {
                                        "Content-Type": "multipart/form-data"
                                },
                                formData:{
                                        'imgIndex':i,
                                        'id':business_id
                                },
                                dataType:'json',
                                success: function(res) {
                                        if (res.statusCode == 200 && res.data == 200) {
                                                $i++;
                                                if($i == $len) {
                                                        wx.showToast({
                                                                title: '提交成功',
                                                                duration: 1000,
                                                                mask: true
                                                        });
                                                        setTimeout(function() {
                                                                wx.redirectTo({
                                                                        url: '../../indexed/park_service/park_service',
                                                                })
                                                        },1200);
                                                }
                                        }else{
                                                
                                        }
                                }
                        });
                }
        }
})