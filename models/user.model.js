const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
    User.associate = db=>{
        User.belongsTo(db.people, {foreignKey: 'personId'})
        //User.hasMany(db.products);
    }
    return User;
}