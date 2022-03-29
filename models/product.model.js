const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: { type: Sequelize.INTEGER }
    });
    Product.associate = db=>{
        Product.belongsTo(db.users, {foreignKey: 'productId'});
    }
}