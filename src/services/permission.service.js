const httpStatus = require('http-status');
const { Language, Program, Permission, Package } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createPermission = async (userBody) => {
  try {
    const permission = new Permission(userBody);

    // Save the document to the database
    await permission.save();
    return permission;
  } catch (err) {
    console.error('Error fetching Permission:', err);
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
};

const getAllPermission = async (filter, options) => {

  try {
    return await Permission.find();
  } catch (err) {
    console.error('Error fetching Program:', err);
    throw err;
  }
};

const getPermission = async (id) => {
  const permissionFound = await getUserById(id);
  if (!permissionFound) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }
  return permissionFound;
};

const updatePermissionById = async (permissionId, updateBody) => {
  const { actions } = updateBody;
  const permission = await Permission.findById(permissionId);
  console.log(permission, 'permission');
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }

  permission.actions = actions;

  await permission.save();

  return permission;

  // Find and update the user
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
  return Permission.findById(id);
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
  createPermission,
  getAllPermission,
  updatePermissionById,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getPermission
  
};
