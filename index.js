const Koa = require('koa')
const app = new Koa()
const fs = require('fs');
const bodyParser = require('koa-bodyparser')   //解析post数据的中间件
const Router = require('koa-router') //路由中间件

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
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

const main = serve(path.join(__dirname,'./static'));

app.use(main);



// 使用ctx.body解析中间件
app.use(bodyParser())

let router = new Router()



router.get('/api/getApi', async function (ctx, next) {
    let result = {
        success:true,
        data:{
            time:new Date()
        }
    }
    ctx.body  = result
});



router.get('/', async function (ctx, next) {
    let title = 'jamie';
    await ctx.render('index', {
        title,
    })
});

router.post('/', function (ctx, next) {
    let postData = ctx.request.body
    ctx.body = postData
});
router.get('/list', async function (ctx, next) {

    await ctx.render('list')

});


app.use(router.routes())
    .use(router.allowedMethods());



app.listen(3009)
console.log('[demo] start-quick is starting at port 3009')