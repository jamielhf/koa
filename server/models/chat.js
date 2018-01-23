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
  /**
   * 查找对话记录
   * @param roomList
   * @return {Promise.<void>}
   */
    async findChatByRoomId(roomList){

        let r = [];

        roomList.map((i,k)=>{
            r.push(i.roomId)
        });


      let  _sql = "SELECT chat.id,chat.uid,chat.create_time,chat.msg,chat.rId,chat.username,`user`.head_url,`user`.email FROM chat,`user`  WHERE  chat.uid = `user`.id AND  chat.rId IN (?) ORDER BY chat.rId limit 50" ;

        return dbUtils.query( _sql,[[...r]] );
    }

}

module.exports = Chat

