const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const NotificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    redirectTo: {
      type: String,
    },
    isRead: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    softDelete: {
      type: Boolean,
      default: false,
      private: true,
    },
    notificationType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
NotificationSchema.plugin(toJSON);
NotificationSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
