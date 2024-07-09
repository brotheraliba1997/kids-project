const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const packageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
packageSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
