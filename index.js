const Koa = require('koa')
const app = new Koa()
const fs = require('fs');
const bodyParser = require('koa-bodyparser')   //解析post数据的中间件

const {router} = require('./router/index') //路由中间件

const path = require('path')
const serve = require('koa-static'); //处理静态文件中间件

const views = require('koa-views')
const { query } = require('./lib/conf')


async function selectAllData( ) {
    let sql = 'SELECT * FROM user'
    let dataList = await query( sql )
    return dataList
}

async function getData() {
    let dataList = await selectAllData()
    console.log( dataList )
}

getData()


// 加载模板引擎
// app.use(views(path.join(__dirname, './views'), {
//     extension: 'ejs'
// }))

const main = serve(path.join(__dirname,'./static/dist'));

app.use(main);



// 使用ctx.body解析中间件
app.use(bodyParser())


app.use(router.routes())
    .use(router.allowedMethods());



app.listen(3009)
console.log('[demo] start-quick is starting at port 3009')