/**
 * Created by linhaifeng
 * on 2017/11/23.
 */


const hasSession = async function (ctx) {
    if(ctx.session.isLogin){
        return true
    }else{
        return false
    }
}


module.exports = {
    hasSession
}