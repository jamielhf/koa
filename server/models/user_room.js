/**
 * Created by linhaifeng
 * on 2018/1/2.
 */
const dbUtils = require('../utils/db-util');

const User_room = {
  /**
   * 对话房间列表
   * @param uid
   * @return {Promise.<*>}
   */
  async roomList(uid){
    let  _sql =  "SELECT * FROM ?? WHERE uid = ? "
    return await dbUtils.query( _sql, [ 'user_room', uid, ] );

  },
  /**
   * 新增用户对应的roomId
   * @param model
   * @returns {Promise.<*>}
   */
  async insertRoom(model){

    return await dbUtils.insertData( 'user_room', model )

  },
}

module.exports = User_room

