const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createProgram = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    softDelete: Joi.boolean(),
  }),
};

const getPrograms = {
  query: Joi.object().keys({
    // name: Joi.string(),
    // role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProgram = {
  params: Joi.object().keys({
    programId: Joi.string().custom(objectId),
  }),
};

const updateProgram = {
  params: Joi.object().keys({
    programId: Joi.required().custom(objectId),
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
  createProgram,
  getProgram,
  updateProgram,
  getPrograms
  // deleteUser,
};
