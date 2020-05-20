const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))

// hash password
async function hashPassword(user, options) {
    if (!user.changed('password')) {
        return
    }
    user.password = await bcrypt.hash(user.password, 10);
}

module.exports = (sequelize, DataTypes) => {
    //User model
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        }
    }, {
        hooks: {
            beforeUpdate: hashPassword,
            beforeSave: hashPassword
        }
    })

    User.prototype.comparePassword = function (password) {
        return bcrypt.compare(password, this.password)
    }

    return User
}