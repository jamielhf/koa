/**
 * Created by linhaifeng
 * on 2017/11/21.
 */
const Koa = require('koa');
const conf = require('./config');
const router = require('./router/api');
const path = require('path');

const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')



const app = new Koa;


// session存储配置
const sessionMysqlConfig= {
    user: conf.database.USERNAME,
    password: conf.database.PASSWORD,
    database: conf.database.DATABASE,
    host: conf.database.HOST,
}
// 配置session中间件  会自己在数据库建个表存放session
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}))

//处理post数据
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');

app.use(bodyParser());
// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './../static')
))
//处理错误
const handler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.type = 'html';
        ctx.response.body = '<p>Something wrong, please contact administrator.</p>';

    }
};

app.use(handler);
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())



app.listen(conf.port);

console.log(`the server is start at port ${conf.port}`)