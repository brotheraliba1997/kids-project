const httpStatus = require('http-status');
const { Language, Program, Visit, User, UploadVideo } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const getIp = (req) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
};
const createVisit = async (req) => {
  try {
    const Ip = getIp(req);
    console.log(Ip, 'Ip');

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    let visit = await Visit.findOne({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
    if (!visit) {
      visit = new Visit();
    }

    if (!visit.ips.includes(Ip)) {
      // visit.count += 1;
      visit.ips.push(Ip);
      visit.count = visit.ips.length;
    }
    await visit.save();
    return { message: 'Visit counted', totalVisits: visit.count };
  } catch (err) {
    console.error('Error fetching visit:', err);
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
};

const getAllVisit = async (filter, options) => {
  try {
    const totalUser = await User.count({ role: 'parent' });
    const totalVideo = await UploadVideo.count({ videoUpload: { $ne: null } });
    console.log(`Total documents: ${totalVideo}`);
    const totalVisit = await Visit.find();
    let totalCount = 0;
    for (var i = 0; i <= totalVisit.length; i++) {
      totalCount += totalVisit[i]?.count || 0; 
      console.log(`Total visit: ${totalVisit[i]?.count}`);
    }
    console.log(`Total count of visits: ${totalCount}`);

    const result = await Visit.aggregate([
      {
        $group: {
          _id: null,              
          totalCount: { $sum: "$count" }  
        }
      }
    ]);
    
    console.log(`Total Count: ${result[0]?.totalCount}`);

    result.forEach(day => {
      console.log(`Date: ${day.totalCount}`);
    });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    let visit = await Visit.findOne({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    const todayVisit = visit ? visit.count : 0;
    return { todayVisit, totalUser, totalVideo, totalVisit };
  } catch (err) {
    console.error('Error fetching visit:', err);
    throw err;
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
  createVisit,
  getAllVisit,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
