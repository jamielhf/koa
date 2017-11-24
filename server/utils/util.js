/**
 * Created by linhaifeng
 * on 2017/11/23.
 */


//接口登录判断
const isLogin = async (ctx, next) => {
    if(ctx.session&&ctx.session.isLogin&&ctx.session.userName){
        await next();
    }else{
        ctx.body = {
            success:false,
            message:'没有登录信息'
        }
    }
};


module.exports = {
    isLogin
}