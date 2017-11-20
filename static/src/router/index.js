import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/page/IndexPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexPage
    }
  ]
})
