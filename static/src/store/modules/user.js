/**
 * Created by linhaifeng on 2016/12/23.
 */
import * as types from '../mutation'
import util from '../../modules/util'


let hasSession = false;



const state = {
  userInfo:{
    username:util.getCookie('username'),
    isLogin:util.getCookie('isLogin'),
    userId:localStorage.getItem('userId')||''
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
    localStorage.setItem('userId',data.id);
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
