const httpStatus = require('http-status');
const { Package, Subscription, User } = require('../models');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const getAllSubscription = async (filter, options) => {
  filter.softDelete = false;
  try {
    options.populate = [{ path: 'package' }, { path: 'user' }];
    const result = await Subscription.paginate(filter, { ...options });
    return result;
  } catch (err) {
    console.error('Error fetching Subscription:', err);
    throw err;
  }
};

const createSubscription = async (userBody, _id) => {
 
  const { packageId } = userBody;
  try {
    let packageFind = await Package.findById(packageId);
    if (!packageFind) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'This package is not available');
    }

    const endDate = calculateEndDate(packageFind?.validity);
    console.log(endDate, "endDate")

    const subscription = new Subscription({
      user: _id,
      type: packageFind.type,
      amount: packageFind.amount,
      validity: packageFind.validity,
      package: packageId,
      endDate: endDate,
    });

    await subscription.save();
    return subscription;
  } catch (err) {
    console.error('Error fetching Subscription:', err);
    throw err;
  }
};

const calculateEndDate = (validity) => {
  const now = moment();
  const validityParts = validity.split(' ');

  if (validityParts.length === 2) {
    const value = parseInt(validityParts[0], 10);
    const unit = validityParts[1].toLowerCase();

    if (unit === 'days' || unit === 'day') {
      return now.add(value, 'days').format('YYYY-MM-DD');
    } else if (unit === 'months' || unit === 'month') {
      return now.add(value, 'months').format('YYYY-MM-DD');
    }
  }

  throw new Error('Invalid validity format');
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
  return User.findById(id);
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
  createSubscription,
  getAllSubscription,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
