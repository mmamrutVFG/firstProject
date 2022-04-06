const Yup = require("yup");

const idSchema = () =>
  Yup.object({
    id: Yup.number().integer().positive().required(),
  });

module.exports = { idSchema };
