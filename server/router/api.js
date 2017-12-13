/**
 * Created by linhaifeng
 * on 2017/11/21.
 */
const Router  = require('koa-router');

const userInfoController = require('../controllers/userInfo')
const indexController= require('../controllers/index')
const {isLogin}  = require('../utils/util')

const api = new Router();
const login = new Router();
const logout = new Router();
const register = new Router();
const user = new Router();
const index = new Router()


logout.use(isLogin)
logout.get('/',userInfoController.userLogout)

user.use(isLogin)
user.get('/',userInfoController.test)

login.post('/',userInfoController.userLogin)


register.post('/',userInfoController.register)


index.get('/test',indexController.test)




api.use('/api/user', user.routes(), user.allowedMethods())
api.use('/api/logout', logout.routes(), logout.allowedMethods())
api.use('/api/login', login.routes(), login.allowedMethods())
api.use('/api/register', register.routes(), register.allowedMethods())
api.use('/api/index', index.routes(), index.allowedMethods())

module.exports = api





