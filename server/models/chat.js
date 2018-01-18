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

    async findChatByRoomId(roomList){

        let r = [];

        roomList.map((i,k)=>{
            r.push(i.roomId)
        })

        let  _sql =  "SELECT * FROM ?? WHERE rId in (?) ORDER BY create_time limit 50 "
        return dbUtils.query( _sql, [ 'chat', ...r] );
    }

}

module.exports = Chat

