const createError = require("http-errors");
const { Supplier, SupplierProduct, Product } = require("../models");

exports.getSupplierData = async () => {
  try {
    return Supplier.findAll({
      // include: [{ model: SupplierProduct }],
    });
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
    await SupplierProduct.create({ supplierId, productId, stock: 1 });
  } catch (err) {
    throw createError(501, "Not able to associate the supplier");
  }
};

exports.numberOfProducts = async (supplierId) => {
  try {
    const supplier = await Supplier.findByPk(supplierId);
    return supplier.countProducts();
  } catch (err) {
    throw createError(501, "Not able to reach the number of products");
  }
};

exports.productNameBySupplier = async (supplierId) => {
  try {
    const suppliers = Supplier.findByPk(supplierId, {
      include: [
        {
          model: Product,
          attributes: ["name"],
          through: { attributes: ["stock"] },
        },
      ],
    });
    return suppliers;
  } catch (err) {
    throw createError(501, "Not able to reach the number of products");
  }
};
