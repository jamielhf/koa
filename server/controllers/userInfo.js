/**
 * Created by MACHENIKE on 2017/11/21.
 */
const User = require('../models/user')
const {isLogin} = require('../utils/util')



const userInfoController =  {
    /**
     * id查找用户信息
     * @param ctx 上下文
     */
    async getUserInfoById(ctx){
        isLogin
           ctx.body ={
               success:true,
               data: ctx.session
           }


    },
    /**
     * 注册
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
       }else{
         delete  data.timestamp;
           data.create_time = new Date();
         let r =await  User.create(data);

           if ( r && r.insertId * 1 > 0) {
               res.success = true;
               res.message = '成功';

           } else {
               res.message ='添加信息失败'
           }
       }
        ctx.body = res;

    },

    /**
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    async userLogin(ctx){
        let data =  ctx.request.body;
        let res = {
            success:false,
            message:'fail'
        }
        if(data.email&&data.pwd){

            let emailResult =await User.isExitByKey('email',data.email);
            if(emailResult.length>0){

                if(emailResult[0].pwd===data.pwd){
                    res.message = '登录成功';

                    let session = ctx.session;

                    session.isLogin = true;
                    session.userName = emailResult[0].username;
                    session.userId = emailResult[0].id;
                    res.success = true
                    res.data = session
                }else{
                    res.message = '密码错误'
                }
            }else{
                res.message = '邮箱不存在'
            }
            ctx.body = res
        }else{
            res.message = '数据不全';
            ctx.body = res
        }



    },
    /**
     * 退出
     * @param ctx
     * @returns {Promise.<void>}
     */
    async userLogout(ctx){
       ctx.session = {};
       ctx.body = {
            success:true,
            message:'退出成功'
        }
    },
    async test(ctx,next){
        ctx.body = 1221
    },
    /**
     *返回用户名
     * @param ctx
     * @returns {Promise.<void>}
     */
    async getUserInfo(ctx){
        if(ctx.session){
            ctx.body = {
                userName:ctx.session.userName
            }
        }

    }
}

module.exports = userInfoController;