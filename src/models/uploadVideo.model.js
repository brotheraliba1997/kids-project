const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const videoUploadSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Language',
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    source: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    Description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
videoUploadSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const UploadVideo = mongoose.model('Upload', videoUploadSchema);

module.exports = UploadVideo;
