require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
require("./utils/userAutenticator");

const express = require("express");
const cors = require("cors");

/*
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 25,
  auth: {
    user: "d249965b1a0647",
    pass: "abaa1156a13242",
  },
});

const info = transporter.sendMail({
  from: "maurimamrut@gmail.com", // sender address
  to: "maurimamrut@gmail.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
});

console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
*/

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
