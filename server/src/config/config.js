const path = require('path')

module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'rik',
        user: process.env.DB_USER || 'rik',
        password: process.env.DB_PASS || 'rik',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: path.resolve(__dirname, '../../rik.sqlite')
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_TOKEN || 'secret'
    }
}