const config = {

    port: 3009,

    database: {
        DATABASE: 'koa_test',
        USERNAME: 'root',
        PASSWORD: '123456',
        PORT: '3306',
        HOST: 'localhost'
    },

    BAIDU:{
        appId: 10667662,
        apiKey: '3R4QYEBQiXepA8zTANZisLbA',
        secretKey: 'aVuZ91E8YTfE6HvWpMK8qya8TzKfRXlQ'
    },

    log:{
        appenders: {
            cheese: { type: 'file', filename: './logs/errorLogs.log' },
            info: { type: 'file', filename: './logs/infoLogs.log' }
        },
        categories: {
            info: { appenders: ['info'], level: 'info' },
            default: { appenders: ['cheese'], level: 'error' },
        }
    }
}

module.exports = config