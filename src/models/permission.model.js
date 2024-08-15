const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const resourceSchema =  mongoose.Schema({
  resource: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  create: {
    type: Boolean,
    default: false,
  },
  update: {
    type: Boolean,
    default: false,
  },
  delete: {
    type: Boolean,
    default: false,
  },
});

// Define the role schema
const PermissionSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  actions: [resourceSchema],
});

// add plugin that converts mongoose to json
PermissionSchema.plugin(toJSON);
PermissionSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission;
