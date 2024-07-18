const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createLanguage = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    softDelete: Joi.boolean(),
  }),
};

const getLanguage = {
  query: Joi.object().keys({
    // name: Joi.string(),
    // role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// const getUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

const updateLanguage = {
  params: Joi.object().keys({
    languageId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      softDelete: Joi.boolean(),
    })
    .min(1),
};

// const deleteUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

module.exports = {
  createLanguage,
  getLanguage,
  updateLanguage,
  // updateUser,
  // deleteUser,
};
