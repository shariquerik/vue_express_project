const { User } = require('../models')


module.exports = {
    async index(req, res) {
        try {
            const users = await User.findAll({
                limit: 10
            })
            res.send(users)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to get the users.'
            })
        }
    },
    async user(req, res) {
        try {
            const users = await User.findOne({
                where: {
                    id: req.params.userId
                }
            })
            res.send(users)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to get the user.'
            })
        }
    },
    async put(req, res) {
        try {
            const users = await User.update(req.body, {
                where: {
                    id: req.params.userId
                }, individualHooks: true
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to update the users.'
            })
        }
    }
}