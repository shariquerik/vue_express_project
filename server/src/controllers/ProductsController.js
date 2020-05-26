const { Product } = require('../models')


module.exports = {
    async index(req, res) {
        try {
            const products = await Product.findAll({
                limit: 10
            })
            res.send(products)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to get the products.'
            })
        }
    },
    async put(req, res) {
        try {
            const products = await Product.update(req.body, {
                where: {
                    id: req.params.productId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to update the product.'
            })
        }
    },
    async post (req, res) {
        try{
            const product = await Product.create(req.body)
            console.log(product)
            const productJson = product.toJSON()
            res.send(productJson)
        } catch (err) {
            res.status(403).send({
                error: 'This product is already in use.'
            })
        }
    },
    async product (req, res) {
        try {
            const products = await Product.findOne({
                where: {
                    id: req.params.productId,
                },
            })
            res.send(products)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to get the products.'
            })
        }
    }
}