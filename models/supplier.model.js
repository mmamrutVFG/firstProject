const Sequelize = require("sequelize");

/**
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = (sequelize) => {
  const Supplier = sequelize.define("supplier", {
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
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  Supplier.associate = (db) => {
    Supplier.belongsToMany(db.products, { through: db.supplierProducts }); // through referenciarlo a la instancia
  };

  return Supplier;
};
