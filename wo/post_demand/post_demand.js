var app = getApp()
Page({
    data: {
        items: [],
        startX: 0, //开始坐标
        startY: 0,
        userinfo: [],
    },
    onLoad: function() {
        var userinfo = wx.getStorageSync('userinfo');
        this.setData({
            userinfo: userinfo,
        })
        var that = this;
        wx.request({
            url: app.data.host + '/api/Demand/getDemandList',
            data: {
                user_id: userinfo.id
            },
            success(res) {
                if (res.statusCode == 200 && res.data.code == 200) {
                    that.setData({
                        items: res.data.data
                    });
                }
            }
        })

        for (var i = 0; i < 10; i++) {
            this.data.items.push({
                isTouchMove: false //默认全隐藏删除
            })
        }
        this.setData({
            items: this.data.items
        })
    },
    //手指触摸动作开始 记录起点X坐标
    touchstart: function(e) {
        //开始触摸时 重置所有删除
        this.data.items.forEach(function(v, i) {
            if (v.isTouchMove) //只操作为true的
                v.isTouchMove = false;

        })
        this.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
            items: this.data.items
        })

    },
    //滑动事件处理
    touchmove: function(e) {
        var that = this,
            index = e.currentTarget.dataset.index, //当前索引
            startX = that.data.startX, //开始X坐标
            startY = that.data.startY, //开始Y坐标
            touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
            touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
            //获取滑动角度
            angle = that.angle({
                X: startX,
                Y: startY
            }, {
                X: touchMoveX,
                Y: touchMoveY
            });
        that.data.items.forEach(function(v, i) {
            v.isTouchMove = false
            //滑动超过30度角 return
            if (Math.abs(angle) > 30) return;
            if (i == index) {
                if (touchMoveX > startX) //右滑
                    v.isTouchMove = false
                else //左滑
                    v.isTouchMove = true

            }

        })
        //更新数据
        that.setData({
            items: that.data.items
        })

    },

    angle: function(start, end) {
        var _X = end.X - start.X,
            _Y = end.Y - start.Y
        //返回角度 /Math.atan()返回数字的反正切值
        return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

    },
    //删除事件
    del: function(e) {
        var that = this;
        var $id = e.currentTarget.dataset.id;
        var $data = that.data.items;
        $data.splice(e.currentTarget.dataset.index,1);
        this.setData({
            items: $data
        })
        wx.request({
            url: app.data.host + '/api/Demand/demandDel',
            data: {
                demand_id: $id
            },
            success(res) {
                if (res.statusCode != 200 || res.data.code != 200) {
                    wx.showToast({
                        title: '删除失败',
                        icon: 'none',
                        mask: true
                    })
                }
            }
        })

    },
    my_demand: function() {
        wx.navigateTo({
            url: '../../wo/fill_demand/fill_demand',
        });
    },
})