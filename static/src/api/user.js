/**
 * Created by linhaifeng
 * on 2018/1/23.
 */

import  * as http   from './module/http'


export default  {
  /**
   * 注册
   * @param username
   * @param email
   * @param pwd
   * @returns {Promise}
   */
  async register(username,email,pwd){
    return await http.post(
      'register',
      {
        username,
        email,
        pwd
      }
    )
  },
  /**
   * 是否登录
   * @return {Promise}
   */
  async isLogin(){


    return await http.get('user')
  },
  /**
   *退出
   * @returns {Promise}
   */
  async logout(){
    return await http.get('logout')
  },
  /**
   * 登录
   * @param email
   * @param pwd
   * @returns {Promise}
   */
  async login(email,pwd){
    return await http.post('login',{
        email,
        pwd
      })
  },

  async getUserInfo(){
    return await http.get('user/info')
  }

}
