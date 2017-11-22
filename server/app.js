/**
 * Created by linhaifeng
 * on 2017/11/21.
 */
const Koa = require('koa');
const conf = require('./config');
const router = require('./router/api');
const path = require('path');
const app = new Koa;
//处理post数据
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');

app.use(bodyParser());
// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './../static')
))

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(conf.port);

console.log(`the server is start at port ${conf.port}`)