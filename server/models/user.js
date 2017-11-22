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
        let  _sql =  "SELECT * FROM ?? WHERE username = ? OR email = ? ";
        return await dbUtils.query( _sql, [ 'user', obj.username, obj.email ] );

    },

}


module.exports = User