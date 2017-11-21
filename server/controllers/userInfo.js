/**
 * Created by MACHENIKE on 2017/11/21.
 */
const User = require('../models/user')

const userInfoController =  {
    /**
     * id查找用户信息
     * @param ctx 上下文
     */
    async getUserInfoById(ctx){
       let result = await User.create({
           username:123,
           pwd:4244
       });

        console.log(result)
       return result
    },
}

module.exports = userInfoController