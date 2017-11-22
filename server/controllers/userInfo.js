/**
 * Created by MACHENIKE on 2017/11/21.
 */
const User = require('../models/user')

const userInfoController =  {
    /**
     * id查找用户信息
     * @param ctx 上下文
     */
    async getUserInfoById(ctx){
       console.log( ctx.query)
        ctx.body ={
           success:true,
            data: ctx.query
        }
    },
    /**
     *
     * @param ctx
     * @returns {Promise.<void>}
     */
    async register(ctx){
        let data =  ctx.request.body;
        let isExit = await User.isExitOne(data);
        let res = {
            success:false,
            message:'fail',
        }
       if(isExit.length>0){
           res.message='已存在用户名或邮箱';
           ctx.body = res;
       }else{

       }


    }
}

module.exports = userInfoController