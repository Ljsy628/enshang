Page({
    data: {
        boxHeight: wx.getSystemInfoSync().windowHeight,
    },
    // 工商财税
    business_tax: function () {
        wx.navigateTo({
            url: '../../consult/business_tax/business_tax'
        })
    },
    // 国际合作
    cooperation: function () {
        wx.navigateTo({
            url: '../../consult/cooperation/cooperation'
        })
    },
    // 技术转移
    transfer: function () {
        wx.navigateTo({
            url: '../../consult/transfer/transfer'
        })
    },
    // 金融服务
    financial: function () {
        wx.navigateTo({
            url: '../../consult/financial/financial'
        })
    },
    // 科技服务
    technologys: function () {
        wx.navigateTo({
            url: '../../consult/technologys/technoligys'
        })
    },
    //政策推广
    promote: function () {
        wx.navigateTo({
            url: '../../consult/policies/policies'
        })
    },
    // 培训会展
    exhibition: function () {
        wx.navigateTo({
            url: '../../consult/exhibition/exhibition'
        })
    },
    // 知识产权
    intellectual: function () {
        wx.navigateTo({
            url: '../../consult/intellectual/intellectual_index/intellectual_index'
        })
    },
})