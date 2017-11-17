const Koa = require('koa');
const app = new Koa();
const {router} = require('./router/index');

const static = require('koa-static');
const path = require('path');
const ejs = require('ejs');
const views = require('koa-views')

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static';


app.use(static(
    path.join( __dirname,  staticPath)
))



// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())



app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')