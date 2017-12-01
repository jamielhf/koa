import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/page/IndexPage'


const LoginIndex = (resolve)=>{require(['../page/LoginIndex.vue'],resolve)}
const SocketPage = (resolve)=>{require(['../page/SocketPage.vue'],resolve)}
const Register = (resolve)=>{require(['../page/RegisterIndex.vue'],resolve)}
Vue.use(Router)


const checkLogin  = (to,from,next)=>{
  let isLogin =localStorage.getItem('isLogin');
   if(isLogin){
     next()
   }else{
     next('./login')
   }

}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexPage
    },
    {
      path: '/socket',
      component: SocketPage,
      beforeEnter:checkLogin
    },

    {
      path: '/login',
      component: LoginIndex
    },
    {
      path: '/register',
      component: Register
    },

  ]
})
