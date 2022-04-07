const Yup = require("yup");

const createUserSchema = () =>
  Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
    person: Yup.object({
      name: Yup.string().required(),
      ci: Yup.string().required(),
      address: Yup.string().required(),
    }),
  }); // Si quiero agregar otro schema que tengo en otro lado uso .concat

module.exports = { createUserSchema };
