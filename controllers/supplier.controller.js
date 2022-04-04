const createError = require("http-errors");
const { Supplier, sequelize } = require("../models");

exports.getSupplierData = async () => {
  try {
    return Supplier.findAll();
  } catch (err) {
    throw createError(500, "Db error");
  }
};

exports.createSupplierData = async (data) => {
  try {
    await Supplier.create(data);
  } catch (err) {
    throw createError(501, "Not able to create supplier", {
      attributes: { id: data.id },
    });
  }
};

exports.deleteSupplierById = async ({ id }) => {
  try {
    await Supplier.destroy({ where: { id } });
  } catch (err) {
    throw createError(501, "Not able to delete the supplier", {
      attributes: { id },
    });
  }
};

exports.deleteAllSuppliers = async ({ id }) => {
  try {
    await Supplier.destroy({ where: {} });
  } catch (err) {
    throw createError(501, "Not able to delete the suppliers", {
      attributes: { id },
    });
  }
};

exports.associateSupplier = async (supplierId, productId) => {
  try {
    const supplier = await Supplier.findByPk(supplierId);
    await supplier.addProducts(productId); // add + nombre del modelo
  } catch (err) {
    throw createError(501, "Not able to associate the supplier");
  }
};
