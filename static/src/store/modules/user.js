/**
 * Created by linhaifeng on 2016/12/23.
 */
import * as types from '../mutation'


const state = {
  userInfo:{
    username:sessionStorage.getItem('username'),
    isLogin:sessionStorage.getItem('isLogin')
  },
}

const getters = {
  getUserInfo:state => state.userInfo,
}


const actions = {
  setUserInfo({commit},data){
    commit(types.SET_USERINFO,data);
    console.log(data)
    sessionStorage.setItem('username',data.username)
    sessionStorage.setItem('isLogin',data.isLogin)
  },

}

const mutations = {
  [types.SET_USERINFO](state,data){
    state.userInfo = data
  },

}

export  default{
  state,
  getters,
  actions,
  mutations,
}
