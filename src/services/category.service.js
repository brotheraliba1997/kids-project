const httpStatus = require('http-status');
const { Package, Category } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createCategory = async (userBody) => {
  try {
    return Category.create(userBody);
  } catch (err) {
    console.error('Error fetching packages:', err);
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
};

const getAllCategory = async (filter, options) => {
  try {
    return await Category.paginate(filter, options);
  } catch (err) {
    console.error('Error fetching packages:', err);
    throw err;
  }
};

const getCategory = async (id) => {
    const categoryFound = await getUserById(id);
    if (!categoryFound) {
      throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
    }
    return categoryFound
};

const updateCategory = async (id, updateBody) => {
  const updateOneCategory = await Category.findById(id);
  if (!updateOneCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(updateOneCategory, updateBody);
  await updateOneCategory.save();
  return updateOneCategory;
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
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return Category.findById(id);
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
  createCategory,
  getAllCategory,
  updateCategory,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getCategory
};
