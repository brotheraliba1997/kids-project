const httpStatus = require('http-status');
const { Video, UploadVideo } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createVideo = async (userBody) => {
  try {
    const contact = await UploadVideo.create(userBody);
    return contact;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
};


const getUserById = async (id) => {
  return UploadVideo.findById(id).populate('language').populate('category');
};

const getAllVideos = async (filter, options) => {
  try {
    options.populate = [
      { path: 'language', select: 'name' },
      { path: 'category', select: 'name' },
    ]
    const result = await UploadVideo.paginate(filter, {
      ...options,
      
    });
    return result;
  } catch (err) {
    console.error('Error fetching Video:', err);
    throw err;
  }
};


const updateVideos = async (id, updateBody) => {
  const updateOneVideo = await UploadVideo.findById(id);
  if (!updateOneVideo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'language not found');
  }
  Object.assign(updateOneVideo, updateBody);
  await updateOneVideo.save();
  return updateOneVideo;
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
  getAllVideos,
  updateVideos,
  getUserById
};
