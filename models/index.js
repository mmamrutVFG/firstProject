const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: "mysql", logging: false }
);

const db = {};
db.sequelize = sequelize;
db.DataTypes = DataTypes;

db.users = require("./user.model")(sequelize, DataTypes);
db.people = require("./person.model")(sequelize, DataTypes);
db.products = require("./product.model")(sequelize, DataTypes);
db.suppliers = require("./supplier.model")(sequelize, DataTypes);
db.supplierProducts = require("./supplierProduct.model")(sequelize, DataTypes);

// si el objeto no tiene función associate no llama a la función
Object.values(db).forEach((model) => model?.associate && model.associate(db));

const models = {
  sequelize,
  User: db.users,
  Person: db.people,
  Product: db.products,
  Supplier: db.suppliers,
  SupplierProduct: db.supplierProducts,
};

module.exports = models;
