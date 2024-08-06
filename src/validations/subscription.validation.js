const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createSubscription = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    amount: Joi.string().required(),
    type: Joi.string().required(),
    validity: Joi.date().required(),
    content: Joi.string().required(),
  }),
};

// const getUsers = {
//   query: Joi.object().keys({
//     name: Joi.string(),
//     role: Joi.string(),
//     sortBy: Joi.string(),
//     limit: Joi.number().integer(),
//     page: Joi.number().integer(),
//   }),
// };

// const getUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

// const updateUser = {
//   params: Joi.object().keys({
//     userId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
//       email: Joi.string().email(),
//       password: Joi.string().custom(password),
//       name: Joi.string(),
//     })
//     .min(1),
// };

// const deleteUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

module.exports = {
  createSubscription,
  // getUsers,
  // getUser,
  // updateUser,
  // deleteUser,
};
