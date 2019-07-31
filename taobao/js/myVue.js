// Vue.component('button-counter', {
//     template: '<button v-on:click="increment">{{ counter }}</button>',
//     data: function () {
//       return {
//         counter: 0
//       }
//     },
//     methods: {
//       increment: function () {
//         this.counter += 1
//         this.$emit('increment')
//       }
//     },
//   })
// var app = new Vue({
//     el: '#app',
//     data: {
//         total: 0
//       },
//       methods: {
//         incrementTotal: function () {
//           this.total += 2
//         }
//       }
// })



//路由
// const NotFound = { template: '<p>Page not found</p>' }
// const Home = { template: '<p>home page</p>' }
// const About = { template: '<p>about page</p>' }
// const routes = {
//   '/': Home,
//   '/about': About
// }
// new Vue({
//   el: '#app',
//   data: {
//     currentRoute: window.location.pathname
//   },
//   computed: {
//     ViewComponent () {
//       return routes[this.currentRoute] || Home
//     }
//   },
//   render (h) { return h(this.ViewComponent) }
// })

// new Vue({
//     el: '#example-4',
//     data: {
//       show: false
//     },
//     methods: {
//       beforeEnter: function (el) {
//         el.style.opacity = 0
//       },
//       enter: function (el, done) {
//         Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
//         Velocity(el, { fontSize: '1em' }, { complete: done })
//       },
//       leave: function (el, done) {
//         Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
//         Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
//         Velocity(el, {
//           rotateZ: '45deg',
//           translateY: '30px',
//           translateX: '30px',
//           opacity: 0
//         }, { complete: done })
//       }
//     }
//   })

// Vue.component('my-component',{
//     template:'<button v-on:click="increment">{{counter}}</button>',
//     data:function(){
//         return {
//             counter:0
//         }
//     },
//     methods:{
//         increment: function(){
//             this.counter += 1
//             this.$emit('increment')
//         }
//     }
// })
// var app = new Vue({
//     el: '#app',
//     data:{
//         total:0
//     },
//     methods:{
//         increamentTotal: function(){
//             this.total += 2
//         }
//     }
// })