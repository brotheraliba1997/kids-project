const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const ProgramSchema = mongoose.Schema(
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
ProgramSchema.plugin(toJSON);
ProgramSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Program = mongoose.model('Program', ProgramSchema);

module.exports = Program;
