
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

  if(setting.type==='post'||setting.type==='POST'){

    console.log(setting.others)
    return axios.post(baseUrl+setting.url,setting.data,setting.others)

  }else if(setting.type==='get'||setting.type==='GET'){

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
  },
  /**
   *
   * @param url
   * @param type
   * @param data
   * @param header
   * @returns {Promise}
   */
  async testApi(url,type,data,header = ''){
    return await conn({
      type:'post',
      url:'index/testApi',
      others:header,
      data:{
        url,
        method:type,
        data
      }
    })
  },


  async upload(data){
    return await conn({
      url: 'index/uploadImg',
      type: 'post',
      others: {'content-type': 'multipart/form-data'},
      data,
    })
  },
}



