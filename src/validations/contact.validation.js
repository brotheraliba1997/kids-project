const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createContact = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    softDelete: Joi.boolean(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    Subject: Joi.string().required(),
    Message: Joi.string().required(),
  }),
};

const getAllContact = {
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

const updateContact = {
  params: Joi.object().keys({
    contactId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      fullName: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      Subject: Joi.string().required(),
      Message: Joi.string().required(),
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
  createContact,
  getAllContact,
  updateContact,
  // updateUser,
  // deleteUser,
};
