const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const packageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ['Individual', 'Business'],
    },

    validity: {
      type: String,
      required: true,
    },

    content: {
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
packageSchema.plugin(toJSON);
packageSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
