const dbUtils = require('../utils/db-util');


const User = {
    async create ( model ) {
        let result = await dbUtils.insertData( 'user', model )
        return result
    },
}


module.exports = User