const Router = require('koa-router') //路由中间件



let router = new Router()



router.get('/', async function (ctx, next) {
    let title = 'jamie';
    await ctx.render('index', {
        title,
    })
});


router.get('/login', async function (ctx, next) {
    let title = '登录';
    await ctx.render('login', {
        title,
    })
});



router.post('/', function (ctx, next) {
    let postData = ctx.request.body
    ctx.body = postData
});

module.exports = {
    router
}
