import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/page/IndexPage'


const LoginIndex = (resolve)=>{require(['../page/LoginIndex.vue'],resolve)}
const Register = (resolve)=>{require(['../page/RegisterIndex.vue'],resolve)}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexPage
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
