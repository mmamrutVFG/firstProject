require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
require("./utils/userAutenticator");

const express = require("express");
const cors = require("cors");

const indexRoute = require("./routes/index");
const { sequelize } = require("./models/index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", indexRoute);
app.use((err, req, res, next) => res.status(err.status).json(err));

(async () => {
  // alter: nombreClase, actualiza las tablas (columnas)
  await sequelize.sync(); // force: borra todos los datos
})();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
