/**
 * Created by linhaifeng
 * on 2017/11/21.
 */
const Router  = require('koa-router');

const userInfoController = require('../controllers/userInfo')
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

const api = new Router();
const login = new Router();
const logout = new Router();
const register = new Router();
const user = new Router();

logout.use(isLogin)
logout.get('/',userInfoController.userLogout)

user.use(isLogin)
user.get('/',userInfoController.test)

login.post('/',userInfoController.userLogin)


register.post('/',userInfoController.register)






api.use('/api/user', user.routes(), user.allowedMethods())
api.use('/api/logout', logout.routes(), logout.allowedMethods())
api.use('/api/login', login.routes(), login.allowedMethods())
api.use('/api/register', register.routes(), register.allowedMethods())

module.exports = api





