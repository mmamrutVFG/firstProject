require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const express = require("express");
const cors = require("cors");

const indexRoute = require("./routes/index");
const { sequelize } = require("./models/index");
const Person = require("./models/person.model");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/", indexRoute);
app.use((err, req, res, next) => res.status(err.status).json(err));

(async () => {
  // alter: nombreClase, actualiza las tablas (columnas)
  await sequelize.sync({ alter: Person }); // force: borra todos los datos
})();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
