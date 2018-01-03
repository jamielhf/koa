const dbUtils = require('../utils/db-util');


const User = {
    /**
     * 插入记录
     * @param model
     * @returns {Promise.<*>}
     */
    async create ( model ) {
        return await dbUtils.insertData( 'user', model )
    },
    /**
     * 是否存在记录
     * @param obj
     * @returns {Promise.<*>}
     */
    async isExitOne (obj ) {
        let  _sql =  "SELECT * FROM ?? WHERE username = ? OR email = ?  limit 1";
        return await dbUtils.query( _sql, [ 'user', obj.username, obj.email ] );

    },

    async findUserByUsername(usename){

        let _sql = "SELECT * FROM ?? WHERE usename = ? "

        return await dbUtils.query( _sql, [ 'user',usename ] );
    },

    /**
     * 是否存在某个值
     * @param key
     * @param val
     * @returns {Promise.<*>}
     */
    async isExitByKey (key,val ) {

        return  await dbUtils.isExitOne('user',key,val)

    },




}


module.exports = User