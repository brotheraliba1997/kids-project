const httpStatus = require('http-status');
const { Language, Contact } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createContact = async (userBody) => {
  try {
    return Contact.create(userBody);
  } catch (err) {
    console.error('Error fetching Language:', err);
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
};

const getAllContact = async (filter, options) => {
  filter.softDelete = false
  try {
    return await Contact.paginate(filter, options);
  } catch (err) {
    console.error('Error fetching packages:', err);
    throw err;
  }
};


const getContact = async (id) => {
  const ContactFound = await getUserById(id);
  if (!ContactFound) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  }
  return ContactFound;
};

const updateContact = async (id, updateBody) => {
  const updateOneContact = await Contact.findById(id);
  if (!updateOneContact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'language not found');
  }
  Object.assign(updateOneContact, updateBody);
  await updateOneContact.save();
  return updateOneContact;
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
  const users = await Contact.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return Contact.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return Contact.findOne({ email });
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
  updateContact,
  getAllContact,
  createContact,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getContact,
};
