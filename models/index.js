const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: "mysql", logging: false }
);

const db = {};
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize);
db.people = require("./person.model")(sequelize);
db.products = require("./product.model")(sequelize);
db.suppliers = require("./supplier.model")(sequelize);

// si el objeto no tiene función associate no llama a la función
Object.values(db).forEach((model) => model?.associate && model.associate(db));

const models = {
  sequelize,
  User: db.users,
  Person: db.people,
  Product: db.products,
  Supplier: db.suppliers,
};

module.exports = models;
