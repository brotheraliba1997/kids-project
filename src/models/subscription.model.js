const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const SubscriptionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Packages',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    endDate: {
      type: Date,
      
    },

    amount: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['active', 'pending', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
SubscriptionSchema.plugin(toJSON);
SubscriptionSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;
