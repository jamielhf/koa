/**
 * Created by linhaifeng
 * on 2017/11/21.
 */
const Router  = require('koa-router');

const userInfoController = require('../controllers/userInfo')
const indexController= require('../controllers/index')
const {isLogin}  = require('../utils/util')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const api = new Router();
const login = new Router();
const logout = new Router();
const register = new Router();
const user = new Router();
const index = new Router()


logout.get('/',userInfoController.userLogout)

user.use(isLogin)
user.get('/',userInfoController.test)
user.get('/info',userInfoController.getUserInfo)

login.post('/',userInfoController.userLogin)


register.post('/',userInfoController.register)


index.get('/article',indexController.article)
 .post('/testApi',isLogin,indexController.testApi)
 .post('/testUploadImg',isLogin,indexController.testUploadImg)
 .post('/uploadImg', isLogin,indexController.uploadImg)


api.use('/api/user', user.routes(), user.allowedMethods())
 .use('/api/logout', logout.routes(), logout.allowedMethods())
 .use('/api/login', login.routes(), login.allowedMethods())
 .use('/api/register', register.routes(), register.allowedMethods())
 .use('/api/index', index.routes(), index.allowedMethods())

module.exports = api





