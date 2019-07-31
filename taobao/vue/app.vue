Vue.component('testOne',{
    template:'<span>123</span>'
})

var app = new Vue(){
    el:'#app',
    data: {
        message: 123
    }
}