require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
require("./utils/userAutenticator");

const Twilio = require("twilio");
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

const accountSid = "AC7ebbeae3ed62a7ef155a1246a53d6088";
const authToken = "e43a1dcfa129cf646f3b8df8f28160d2";

const client = new Twilio(accountSid, authToken);

client.messages
  .create({
    body: "Prueba SMS con Twilio",
    to: "+59895325030", // Text this number
    from: "+19374428740", // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));

(async () => {
  // alter: nombreClase, actualiza las tablas (columnas)
  await sequelize.sync(); // force: borra todos los datos
})();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
