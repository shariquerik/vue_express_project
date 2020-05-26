const {
    sequelize,
    User,
    Product
} = require('../src/models')

const Promise = require('bluebird')
const users = require('./users.json')
const products = require('./products.json')

sequelize.sync({force :true})
    .then(async function(){

        await Promise.all(
            users.map(user => {
                User.create(user)
            })
        )
        await Promise.all(
            products.map(product => {
                Product.create(product)
            })
        )

    })