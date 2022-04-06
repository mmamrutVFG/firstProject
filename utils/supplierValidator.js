const Yup = require("yup");

const createSupplierSchema = () =>
  Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
  });

module.exports = { createSupplierSchema };
