/**
 * Created by linhaifeng
 * on 2017/11/21.
 */
const Koa = require('koa');
const conf = require('./config');
const router = require('./router/index');
const path = require('path');
const log4js = require('log4js');
const {info} = require('./utils/log-util');
const {isLogin}  = require('./utils/util')




log4js.configure(conf.log);

const app = new Koa;

const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);




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
    // path.join(__dirname , './../static'),
    path.join(__dirname , './static')
))



// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())


app.on('error', function (err, ctx) {
    console.log(err)
    logger.error('server error', err, ctx)
})




//socket 应用
io.on('connection', function(socket){
    let users = {},
        usocket = {};
    console.log(socket.id)

    console.log('--------一个用户连接上了--------');
    socket.on('sendMsg',  (data) =>{

        io.emit('sendRoomMsg',data);
    });

    //初始连接
    socket.on('userJoin', function(data) {
        users[id] = data.id;
        usocket[id] = socket;
    })
    socket.on('to'+1, function(data) {
        users[id] = data.id;
        usocket[id] = socket;
    })

    socket.on('disconnect', function() {
        console.log('--------一个用户断开了连接--------');
    });

});
server.listen(conf.port);

console.log(`the server is start at port ${conf.port}`)