const httpStatus = require('http-status');
const { Video } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createVideo = async (userBody) => {
  try {
    const contact = await Video.create(userBody);
    return contact;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
};

const queryVideos = async () => {
  try {
    const videos = await Video.find()
    .sort({ createdAt: -1 });
    return videos;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
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
  queryVideos,
};
