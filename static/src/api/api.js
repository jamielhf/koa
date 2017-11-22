
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
    }
}



