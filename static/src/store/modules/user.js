/**
 * Created by linhaifeng on 2016/12/23.
 */
import * as types from '../mutation'
import util from '../../modules/util'

const state = {
  userInfo:{
    username:util.getCookie('username'),
    isLogin:util.getCookie('isLogin')
  },
}

const getters = {
  getUserInfo:state => state.userInfo,
}


const actions = {
  setUserInfo({commit},data){
    commit(types.SET_USERINFO,data);
    util.setCookie('username',data.username);
    util.setCookie('isLogin',data.isLogin);
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
