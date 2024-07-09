const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const videoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    categories: {
      type: String,
      required: true,
      enum: ['culture', 'language', 'others'],
    },

    upload: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
videoSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Video = mongoose.model('video', videoSchema);

module.exports = Video;
