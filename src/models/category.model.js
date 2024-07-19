const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const categorySchema = mongoose.Schema(
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
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * @typedef Token
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
