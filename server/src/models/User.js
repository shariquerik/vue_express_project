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
        firstName: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        lastName: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        phone: {
            type: DataTypes.INTEGER,
            defaultValue: 'user'
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
        bookmarked: { 
            type: DataTypes.STRING, 
            get: function() {
                return JSON.parse(this.getDataValue('bookmarked'));
            }, 
            set: function(val) {
                return this.setDataValue('bookmarked', JSON.stringify(val));
            },
            defaultValue: '[]'
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