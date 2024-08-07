const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createPackage = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    amount: Joi.string().required(),
    type: Joi.string().required(),
    validity: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

const getPackages = {
  query: Joi.object().keys({
    // name: Joi.string(),
    // role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPackage = {
  params: Joi.object().keys({
    packageId: Joi.string().custom(objectId),
  }),
};

const updatePackage = {
  params: Joi.object().keys({
    packageId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      softDelete: Joi.boolean(),
      name: Joi.string(),
      amount: Joi.string(),
      type: Joi.string(),
      validity: Joi.string(),
      content: Joi.string(),
    })
    .min(1),
};

module.exports = {
  createPackage,
  updatePackage,
  getPackage,
  getPackages,
};
