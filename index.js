console.log(process.env.NODE_ENV);

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

console.log(process.env.PORT);
const express = require("express");
const cors = require("cors");

const indexRoute = require("./routes/index");
const { sequelize, User } = require("./models/index");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/", indexRoute);

(async () => {
  // alter: nombreClase, actualiza las tablas (columnas)
  await sequelize.sync(); // force: borra todos los datos
  console.log("Database ready");
})();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
