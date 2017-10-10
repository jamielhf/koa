const Koa = require('koa')
const app = new Koa()
const fs = require('fs');
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')



let postPage = new Router()

// 使用ctx.body解析中间件
app.use(bodyParser())

postPage.get('/',async (ctx)=>{


})



// 装载所有子路由
let router = new Router()
router.use('/', postPage.routes(), postPage.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())



app.listen(3009)
console.log('[demo] start-quick is starting at port 3009')