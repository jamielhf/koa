/**
 * Created by linhaifeng on 2016/12/23.
 */
import * as types from '../mutation'


const state = {
  userInfo:{
    username:localStorage.getItem('username'),
    isLogin:localStorage.getItem('isLogin')
  },
}

const getters = {
  getUserInfo:state => state.userInfo,
}


const actions = {
  setUserInfo({commit},data){
    commit(types.SET_USERINFO,data);

    localStorage.setItem('username',data.username)
    localStorage.setItem('isLogin',data.isLogin)
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
