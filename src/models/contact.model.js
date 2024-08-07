const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const contactSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
     
    },

    phone: {
      type: String,
      required: true,
     
    },

    Subject : {
      type: String,
      required: true,
     
    },

    Message : {
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
contactSchema.plugin(toJSON);
contactSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
