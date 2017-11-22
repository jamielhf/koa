/**
 * Created by linhaifeng
 * on 2017/11/21.
 */
const Router  = require('koa-router');

const userInfoController = require('../controllers/userInfo')


const api = new Router();
const login = new Router();
const register = new Router();
const user = new Router();



login.get('/',userInfoController.getUserInfoById)
    .get('/ttt',function (ctx) {
    ctx.body = {
        a:123
    }
})
register.post('/',userInfoController.register)


api.use('/api/login', login.routes(), login.allowedMethods())
api.use('/api/register', register.routes(), register.allowedMethods())

module.exports = api





