const Router = require('koa-router') //路由中间件



let router = new Router()

let login = new Router()
let index = new Router()



login.get('/', async ( ctx )=>{


    let query = ctx.query;
    console.log(query)

    await ctx.render('login',{
        title:123
    })
})

login.post('/', async ( ctx )=>{

    let postData = ctx.request.body;
    ctx.cookies.set(
        'cid',
        'hello world',
        {
            domain: 'localhost',  // 写cookie所在的域名
            path: '/',       // 写cookie所在的路径
            maxAge: 10 * 60 * 1000, // cookie有效时长
            expires: new Date('2017-02-15'),  // cookie失效时间
            httpOnly: false,  // 是否只用于http请求中获取
            overwrite: false  // 是否允许重写
        }
    )
    ctx.body = postData
})

index.get('/', async ( ctx )=>{
    await ctx.render('index',{
        title:123
    })
})


router.use('/login', login.routes(), login.allowedMethods())
router.use('/', index.routes(), index.allowedMethods())


module.exports = {
    router
}
