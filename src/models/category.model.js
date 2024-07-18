const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
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

/**
 * @typedef Token
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
