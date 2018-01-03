import Vue from 'vue'
import util from '../modules/util'
import Router from 'vue-router'
import IndexPage from '@/page/IndexPage'


const LoginIndex = (resolve)=>{require(['../page/LoginIndex.vue'],resolve)}
const SocketPage = (resolve)=>{require(['../page/SocketPage.vue'],resolve)}
const SuperagentPage = (resolve)=>{require(['../page/SuperagentPage.vue'],resolve)}
const Register = (resolve)=>{require(['../page/RegisterIndex.vue'],resolve)}
const TestApiPage = (resolve)=>{require(['../page/TestApiPage.vue'],resolve)}
const UploadImg = (resolve)=>{require(['../page/UploadImg.vue'],resolve)}
Vue.use(Router)


const checkLogin  = (to,from,next)=>{


  let isLogin = util.getCookie('isLogin')?true:false;

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
      redirect:'/socket',
      component: IndexPage
    },
    {
      path: '/testApi',
      component: TestApiPage,
      beforeEnter:checkLogin
    },
    {
      path: '/uploadImg',
      component: UploadImg,
      beforeEnter:checkLogin
    },

    {
      path: '/socket',
      component: SocketPage,
      beforeEnter:checkLogin
    },
    {
      path: '/superagent',
      component: SuperagentPage,
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
