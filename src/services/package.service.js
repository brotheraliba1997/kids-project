const httpStatus = require('http-status');
const { Package } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createPackage = async (userBody) => {
  try {
    return Package.create(userBody);
  } catch (err) {
    console.error('Error fetching packages:', err);
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
};

const getAllPackages = async (filter, options) => {
  filter.softDelete = false;
  try {
    return await Package.paginate(filter, options);
  } catch (err) {
    console.error('Error fetching packages:', err);
    throw err;
  }
};

const getPackage = async (id) => {
  const packageFound = await getUserById(id);
  if (!packageFound) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }
  return packageFound;
};


const updatePackage = async (id, updateBody) => {
  const updateOnePackage = await Package.findById(id);
  if (!updateOnePackage) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }
  Object.assign(updateOnePackage, updateBody);
  await updateOnePackage.save();
  return updateOnePackage;
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
const queryUsers = async (filter, options) => {
  const users = await Package.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return Package.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackage,
  updatePackage,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
