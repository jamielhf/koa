
import axios from 'axios';

const baseUrl = "/api/";

const  conn = async (setting)=>{

  setting = Object.assign({},{
    type:'get',
    timeout:8000,
  },setting)

  setting.data = Object.assign({},{
    timestamp:(new Date).getTime()
  }, setting.data)

  if(setting.type==='post'){

    return axios.post(baseUrl+setting.url,setting.data,setting.others)


  }else if(setting.type==='get'){

    return axios.get(baseUrl+setting.url, {params:setting.data})

  }

}


export default {
  /**
   * 注册
   * @param username
   * @param email
   * @param pwd
   * @returns {Promise}
   */
    async register(username,email,pwd){
       return await conn({
         url:'register',
         type:'post',
         data:{
           username,
           email,
           pwd
         }
       })
    },
  /**
   * 登录
   * @param email
   * @param pwd
   * @returns {Promise}
   */
    async login(email,pwd){
      return await conn({
        url:'login',
        type:'post',
        data:{
          email,
          pwd
        }
      })
    },
  /**
   *退出
   * @returns {Promise}
   */
  async logout(){
     return await conn({
       url:'logout'
     })
  },
  async articleList(){
    return await  conn({
      url:'index/article'
    })
  }
}



