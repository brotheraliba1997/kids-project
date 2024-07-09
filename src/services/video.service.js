const httpStatus = require('http-status');
const { Package } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createVideo = async (userBody) => {
  // if (await User.isEmailTaken(userBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  console.log(userBody);
  // }
  // return Package.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */

module.exports = {
  createVideo,
};
