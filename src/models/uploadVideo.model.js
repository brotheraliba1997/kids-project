const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
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

    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
      required: true,
    },

    videoUpload: {
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

    
    softDelete: {
      type: Boolean,
      default: false,
      private:true
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
videoUploadSchema.plugin(toJSON);
videoUploadSchema.plugin(paginate);

/**
 * @typedef Token
 */
const UploadVideo = mongoose.model('Upload', videoUploadSchema);

module.exports = UploadVideo;
