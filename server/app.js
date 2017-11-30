/**
 * Created by linhaifeng
 * on 2017/11/21.
 */
const Koa = require('koa');
const conf = require('./config');
const router = require('./router/api');
const path = require('path');
const log4js = require('log4js');
const {info} = require('./utils/log-util');
log4js.configure(conf.log);

const app = new Koa;

const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

io.on('connection', function(socket){

    socket.on('sendMsg',  (data) =>{
        console.log(data)
        if(data){
            io.sockets.emit('allMsg',data)
        }

    });
});


const logger = log4js.getLogger('cheese');


const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')


//处理post数据
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');




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


// logger


app.use(info);
app.use(bodyParser());
// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './../static')
))



// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())


app.on('error', function (err, ctx) {
    console.log(err)
    logger.error('server error', err, ctx)
})


server.listen(conf.port);

console.log(`the server is start at port ${conf.port}`)