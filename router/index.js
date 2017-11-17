const Router = require('koa-router') //路由中间件



let router = new Router()

let login = new Router()
let index = new Router()



login.get('/', async ( ctx )=>{
    await ctx.render('login',{
        title:123
    })
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
