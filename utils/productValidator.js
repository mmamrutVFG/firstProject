const Yup = require("yup");

const createProductSchema = () =>
  Yup.object({
    name: Yup.string().required(),
    price: Yup.number().positive().integer().required(),
  });

module.exports = { createProductSchema };
