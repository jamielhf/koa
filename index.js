const Koa = require('koa')
const app = new Koa()
const fs = require('fs');
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')

// 使用ctx.body解析中间件
app.use(bodyParser())

let router = new Router()






router.get('/list', async (ctx)=>{



})



app.use(router.routes())
    .use(router.allowedMethods());



app.listen(3009)
console.log('[demo] start-quick is starting at port 3009')