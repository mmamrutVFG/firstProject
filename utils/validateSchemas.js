const createError = require("http-errors");

const validateBodyMW = (resourseSchema) => async (req, _, next) => {
  const { body } = req;
  try {
    await resourseSchema().validate(body);
    next();
  } catch (err) {
    next(createError(400, err.message));
  }
};

const validateParamsMW = (resourseSchema) => async (req, _, next) => {
  const { params } = req;
  try {
    await resourseSchema().validate(params);
    next();
  } catch (err) {
    next(createError(400, err.message));
  }
};

module.exports = { validateBodyMW, validateParamsMW };
