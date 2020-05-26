const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const UsersController = require('./controllers/UsersController')
const ProductsController = require('./controllers/ProductsController')

module.exports = (app) => {
    
    //register
    app.post('/register',
        AuthenticationControllerPolicy.validateField,
        AuthenticationController.register)

    //login
    app.post('/login',
        AuthenticationControllerPolicy.validateField,
        AuthenticationController.login)

    //get users
    app.get('/users',
        AuthenticationControllerPolicy.isAdmin,
        UsersController.index)
    
    //update user
    app.put('/users/:userId',
        UsersController.put)

    //product
    app.post('/product',
        ProductsController.post)

    //get products
    app.get('/products',
        ProductsController.index)

    //update product
    app.get('/product/:productId',
        ProductsController.product)

    //update product
    app.put('/products/:productId/edit',
        ProductsController.put)
    
}