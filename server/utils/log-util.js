/**
 * Created by linhaifeng
 * on 2017/11/28.
 */
const conf = require('../config');
const log4js = require('log4js');
log4js.configure(conf.log);

const loggerInfo = log4js.getLogger('info');


const info = async function (ctx,next) {
    const start = new Date()
    await next()
    const ms = new Date() - start;
    loggerInfo.info(`===========start===============`)
    loggerInfo.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
    if(ctx.method=='GET'){
        loggerInfo.info('入参：'+JSON.stringify(ctx.query))
    }else if(ctx.method=='POST'){
        loggerInfo.info( ctx.request.body)
    }
    loggerInfo.info(`=============end===============`)

}


module.exports = {
    info
}