/**
 * Created by linhaifeng
 * on 2017/11/21.
 */
const Router  = require('koa-router');

const userInfoController = require('../controllers/userInfo')


const api = new Router();
const login = new Router();
const user = new Router();



login.get('/',userInfoController.getUserInfoById)

login.get('/ttt',function (ctx) {
        ctx.body = {
            a:123
        }
})

console.log(login)

api.use('/api/login', login.routes(), login.allowedMethods())

module.exports = api





