const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
    validateField(req, res, next) {
        const schema = {
            email: Joi.string().email().required(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{6,32}$')
            ).required()
        }
        const { error, value } = Joi.validate(req.body, schema)

        if (error) {
            console.log(error)
            res.status(400).send({
                error: error.details[0].message,
                field: error.details[0].context.key,
                type: error.details[0].type
            })
        } else {
            next()
        }
    },

    isAdmin (req, res, next){
        const authHeader = req.headers.authorization
        if(authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, config.authentication.jwtSecret, function (err, decoded){
                if (err) throw err
                else{
                    if(decoded.role != 'admin'){
                        res.status(400).send("Access Denied, contact your admin.")
                    }else{
                        next()
                    }
                }
            })
        }
        else{
            res.status(400).send('Need to Login')
        }
    }
}