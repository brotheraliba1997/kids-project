const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const LanguageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    softDelete: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
LanguageSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Language = mongoose.model('Language', LanguageSchema);

module.exports = Language;
