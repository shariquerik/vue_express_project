
module.exports = (sequelize, DataTypes) => {
    //Product model
    const Product = sequelize.define('Product', {
        productName: {
            type: DataTypes.STRING,
            unique: true
        },
        price: DataTypes.INTEGER,
    })
    return Product
}