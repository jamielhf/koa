/**
 * Created by linhaifeng
 * on 2018/1/2.
 */
const dbUtils = require('../utils/db-util');

const Chat = {
    /**
     * 插入记录
     * @param model
     * @returns {Promise.<*>}
     */
    async insertChat(model){

     return await dbUtils.insertData( 'chat', model )


    }
}

module.exports = Chat

