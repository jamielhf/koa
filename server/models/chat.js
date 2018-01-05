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

    },

    async findChatByRoomId(roomId){
        let  _sql =  "SELECT * FROM ?? WHERE rId = ?  limit 50"
        return dbUtils.query( _sql, [ 'chat', roomId ] );
    }

}

module.exports = Chat

