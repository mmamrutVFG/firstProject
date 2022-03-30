const { User } = require("../models");

exports.getUsersData = () => User.findAll();

exports.createUserData = (data) => User.create(data);

exports.deleteUserById = ({ id }) => User.destroy({ where: { id } });
