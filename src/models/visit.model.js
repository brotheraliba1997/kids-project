const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const visitSchema = mongoose.Schema(
  {
    count: {
      type: Number,
      default: 0
    },

    ips: {
      type: [String],
      default: ["123.45.67.89"],
      
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
visitSchema.plugin(toJSON);
visitSchema.plugin(paginate);

/**
 * @typedef Token
 */
const visit = mongoose.model('visits', visitSchema);

module.exports = visit;
