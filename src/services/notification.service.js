const httpStatus = require('http-status');
const { Language, Notification, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createNotification = async (notificationMessgae ) => {
  try {
    const newNotification = new Notification({
      title: notificationMessgae?.title,
      description: notificationMessgae?.description,
      notificationType: notificationMessgae?.notificationType,
      user: notificationMessgae?.user,
    });

    await newNotification.save();
  } catch (err) {
    console.error('Error creating Notification:', err);
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
};

const getAllNotification = async (filter, options) => {
  filter.softDelete = false;
  try {
    options.populate = [{ path: 'user' }];
    return await Notification.paginate(filter, { ...options });
  } catch (err) {
    console.error('Error fetching packages:', err);
    throw err;
  }
};

const getNotification = async (id) => {
  const notificationFound = await getUserById(id);
  if (!notificationFound) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  }
  return notificationFound;
};

const updateNotification = async (id, userID) => {
  // console.log(updateBody, "updateBody")
  const updatedNotification = await Notification.findByIdAndUpdate(
    id,
    { $addToSet: { isRead: userID } },  // Add userId to isRead array only if it does not already exist
    { new: true }  // Return the updated document
  );
  if (!updatedNotification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'notification not found');
  }
  
 
  return updatedNotification;
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
  return Notification.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return Notification.findOne({ email });
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
  updateNotification,
  getAllNotification,
  createNotification,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getNotification,
};
