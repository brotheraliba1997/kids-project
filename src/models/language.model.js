const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const LanguageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
LanguageSchema.plugin(toJSON);
LanguageSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Language = mongoose.model('Language', LanguageSchema);

module.exports = Language;
