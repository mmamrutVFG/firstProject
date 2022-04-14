const createError = require("http-errors");

const { Product } = require("../models");

exports.getProductData = async () => {
  try {
    return Product.findAll();
  } catch (err) {
    throw createError(500, "Db error"); // {attributes: {nombre:data.nombre}} pasarle mas datos para identificar el error
  }
};

exports.getProductById = async (id) => {
  try {
    return await Product.findOne({ where: { id } });
  } catch (err) {
    throw createError(500, "Db error");
  }
};

exports.createProductData = async (data) => {
  try {
    await Product.create(data);
  } catch (err) {
    throw createError(501, "Not able to create product", {
      attributes: { id: data.id },
    });
  }
};

exports.deleteProductById = async ({ id }) => {
  try {
    await Product.destroy({ where: { id } });
  } catch (err) {
    throw createError(501, "Not able to delete the product", {
      attributes: { id },
    });
  }
};

exports.deleteAllProducts = async ({ id }) => {
  try {
    await Product.destroy({ where: {} });
  } catch (err) {
    throw createError(501, "Not able to delete the product", {
      attributes: { id },
    });
  }
};

exports.associateUser = async (productId, userId) => {
  try {
    await Product.update({ userId }, { where: { id: +productId } });
  } catch (err) {
    throw createError(501, "Not able to associate the user");
  }
};

exports.upload = async (file) => {
  /*
  try {
    if (!file) {
      throw createError(415, "Please upload a CSV file");
    }
    const fileBuffer = file.buffer.toString().split("\r\n");
      .pipe(csv.parse({ headers: true }))
      .on("error", (err) => {
        throw err.message;
      })
      
      .on("data", (row) => {
        products.push(row);
      })
      .on("end", async () => {
        await Product.bulkCreate(products);
      });
  } catch (err) {
    console.log(err);
    throw createError(400, "Not able to upload the file");
  }
  */
};
