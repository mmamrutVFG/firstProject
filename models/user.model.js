const Sequelize = require("sequelize");
/**
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  User.associate = (db) => {
    User.hasMany(db.products, { foreignKey: "userId" });
    User.hasOne(db.people, { foreignKey: "userId" });
  };
  return User;
};
