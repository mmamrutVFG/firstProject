const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Person = sequelize.define('person', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ci: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        adress: {
            type: Sequelize.STRING
        }
    });
    Person.associate = db=>{
        Person.hasOne(db.users, {foreignKey: 'personId'})
    }
    return Person;
}