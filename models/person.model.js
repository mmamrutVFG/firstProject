const Sequelize = require("sequelize");
/**
 * @param {import('sequelize').Sequelize} sequelize
 */

module.exports = (sequelize) => {
  const Person = sequelize.define("person", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ci: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
    },
  });
  Person.associate = (db) => {
    Person.belongsTo(db.users, { foreignKey: "userId" });
  };
  return Person;
};
