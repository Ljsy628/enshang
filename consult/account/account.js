// consult/account/account.js
Page({
    data: {
        
    },
    onLoad: function (options) {

    },
    sure_app: function(e){
        var comname = e.detail.value.comname
        var person = e.detail.value.person
        var tel = e.detail.value.tel
        var time = e.detail.value.time
        console.log(comname)
        console.log(person)
        console.log(tel)
        console.log(time)
    }
})