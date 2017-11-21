/**
 * Created by linhaifeng
 * on 2017/11/21.
 */
const Koa = require('koa');
const conf = require('./config');
const path = require('path');
const app = new Koa;

const koaStatic = require('koa-static');



// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './../static')
))




app.listen(conf.port);

console.log(`the server is start at port ${conf.port}`)