/**
 * @param {import('sequelize').Sequelize} sequelize
 */

module.exports = (sequelize, DataTypes) => {
  const SupplierProduct = sequelize.define("supplierProduct", {
    stock: { type: DataTypes.INTEGER },
  });

  return SupplierProduct;
};
