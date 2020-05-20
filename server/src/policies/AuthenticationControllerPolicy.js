const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
    register(req, res, next) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{6,32}$')
            ),
            role: Joi.string()
        }
        const { error, value } = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: 'The password provide is not valid.'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })

            }
        } else {
            next()
        }
    },

    isAdmin (req, res, next){
        const authHeader = req.headers.authorization
        if(authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, config.authentication.jwtSecret, function (err, decoded){
                if (err) throw err;
                if(decoded.role != 'admin'){
                    res.status(400).send("Access Denied, contact your admin.")
                }else{
                    next()
                }
            })
        }
        else{
            res.status(400).send('Need to Login')
        }
    }
}