const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const subscriptionsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },

    package: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Package',
      required: true,
    },

    expaireDate: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
subscriptionsSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Subscriptions = mongoose.model('Subscriptions', subscriptionsSchema);

module.exports = Subscriptions;
