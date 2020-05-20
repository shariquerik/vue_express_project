const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const UsersController = require('./controllers/UsersController')

module.exports = (app) => {
    
    //register
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register),

    //login
    app.post('/login',
        AuthenticationController.login),

    //get users
    app.get('/users',
        AuthenticationControllerPolicy.isAdmin,
        UsersController.index),
    
    //update user
    app.put('/users/:userId',
        AuthenticationControllerPolicy.isAdmin,
        UsersController.put)
    
}