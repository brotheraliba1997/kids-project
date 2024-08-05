const httpStatus = require('http-status');
const { Language, Program } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createProgram = async (userBody) => {
  try {
    return Program.create(userBody);
  } catch (err) {
    console.error('Error fetching Program:', err);
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
};

const getAllPrograms = async (filter, options) => {
  filter.softDelete = false
  try {
    return await Program.paginate(filter, options);
  } catch (err) {
    console.error('Error fetching Program:', err);
    throw err;
  }
};


const getProgram = async (id) => {
  const categoryFound = await getUserById(id);
  if (!categoryFound) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }
  return categoryFound;
};

const updateProgram = async (id, updateBody) => {
  const updateOneLanguage = await Program.findById(id);
  if (!updateOneLanguage) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }
  Object.assign(updateOneLanguage, updateBody);
  await updateOneLanguage.save();
  return updateOneLanguage;
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
  const users = await Program.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return Program.findById(id);
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
  createProgram,
  getAllPrograms,
  getProgram,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  updateProgram,
};
