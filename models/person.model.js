/**
 * @param {import('sequelize').Sequelize} sequelize
 */

module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define("person", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ci: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    celphone: {
      type: DataTypes.STRING,
    },
  });
  Person.associate = (db) => {
    Person.belongsTo(db.users, { foreignKey: "userId" });
  };
  return Person;
};
