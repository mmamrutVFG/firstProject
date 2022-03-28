const Sequelize = require('sequelize');

const sequelize = new Sequelize('first_project', 'root', 'Arenita2022', {host: 'localhost', dialect: 'mysql'});

module.exports = sequelize;