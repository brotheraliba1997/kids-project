const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createVideo = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    language: Joi.string().required(),
    category: Joi.string().required(),
    videoUpload: Joi.string().required(),
    Description: Joi.string(),
    thumbnail: Joi.string(),
  }),
};

const getVideo = {
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

const updateVideos = {
  params: Joi.object().keys({
    videoId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      language: Joi.string(),
      category: Joi.string(),
      videoUpload: Joi.string(),
      thumbnail: Joi.string(),
      Description: Joi.string(),
    })
    .min(1),
};

// const deleteUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

module.exports = {
  createVideo,
  getVideo,
  updateVideos,
};
