/**
 * Created by MACHENIKE on 2017/11/21.
 */
const User = require('../models/user')

const userInfoController =  {


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

        if(!data.username||!data.pwd){
            res.message ='信息不全'
        }else{
            if(isExit.length>0){
                res.message='已存在用户名或邮箱';
            }else{
                delete  data.timestamp;
                data.create_time = new Date();
                data.id =Math.random().toString(16).substr(2);

                let r = await  User.create(data);

                if ( r && typeof (r.insertId) ==='number') {
                    res.success = true;
                    res.message = '成功';

                } else {
                    res.message ='添加信息失败'
                }
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
                    ctx.cookies.set(
                        'username',
                        emailResult[0].username,
                        {
                            domain: 'localhost',  // 写cookie所在的域名
                            path: '/',       // 写cookie所在的路径
                            maxAge: (new Date()).getTime()/1000-15*24*60*60*1000, // cookie有效时长
                            expire:'',
                            httpOnly: false,  // 是否只用于http请求中获取
                            overwrite: true  // 是否允许重写
                        }
                    )

                    ctx.cookies.set(
                        'isLogin',
                        true,
                        {
                            domain: 'localhost',  // 写cookie所在的域名
                            path: '/',       // 写cookie所在的路径
                            maxAge:'', // cookie有效时长
                            expire:'',
                            httpOnly: false,  // 是否只用于http请求中获取
                            overwrite: true  // 是否允许重写
                        }
                    )
                    session.isLogin = true;
                    session.userName = emailResult[0].username;
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

        ctx.cookies.set(
            'username',
            '',
            {
                domain: 'localhost',  // 写cookie所在的域名
                path: '/',       // 写cookie所在的路径
                maxAge: -1 , // cookie有效时长
                httpOnly: false,  // 是否只用于http请求中获取
                overwrite: false  // 是否允许重写
            }
        )
        ctx.cookies.set(
            'userId',
            '',
            {
                domain: 'localhost',  // 写cookie所在的域名
                path: '/',       // 写cookie所在的路径
                maxAge: -1 , // cookie有效时长
                httpOnly: false,  // 是否只用于http请求中获取
                overwrite: false  // 是否允许重写
            }
        )
        ctx.cookies.set(
            'isLogin',
            false,
            {
                domain: 'localhost',  // 写cookie所在的域名
                path: '/',       // 写cookie所在的路径
                maxAge:-1, // cookie有效时长
                httpOnly: false,  // 是否只用于http请求中获取
                overwrite: false  // 是否允许重写
            }
        )

       ctx.body = {
            success:true,
            message:'退出成功'
        }
    },
    async test(ctx,next){
        ctx.body = 1221
    },
    /**
     *
     * @param ctx
     * @returns {Promise.<void>}
     */
    async getUserInfo(ctx){
        let r  = await User.findUserByUsername(ctx.session.userName);

        let res = {
            success:false
        }
        if(r.length>0){
            res.success = true;
            delete  r[0].pwd
            res.data = r[0];
        }

        ctx.body = res
    }
}

module.exports = userInfoController;