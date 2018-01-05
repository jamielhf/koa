/**
 * Created by linhaifeng
 * on 2018/1/2.
 */
const dbUtils = require('../utils/db-util');

const Room = {
    /**
     * 查找room
     * @param userId
     * @returns {Promise.<*>}
     */
    async findRoomById(userId){
        let  _sql =  "SELECT * FROM ?? WHERE uid = ?  limit 1"
        return await dbUtils.query( _sql, [ 'room', userId, ] );

    },
    /**
     * 新增用户对应的roomId
     * @param model
     * @returns {Promise.<*>}
     */
    async insertRoom(model){

        return await dbUtils.insertData( 'room', model )

    },
    /**
     * 是否已经存在对应关系
     * @returns {Promise.<void>}
     */
    async isExitOne(uid){
        return await dbUtils.isExitOne('room','uid',uid)
    }
}

module.exports = Room

