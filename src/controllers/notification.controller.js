const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, notificationService,  } = require('../services');

const createNotification = catchAsync(async (req, res) => {
  const user = await notificationService.createNotification(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllNotification  = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const userID = req.user._id
  filter.user = userID
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const user = await notificationService.getAllNotification(filter,options);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});


const getNotification  = catchAsync(async (req, res) => {
  const { languageId } = req.params;
  const user = await notificationService.getNotification(languageId);
  res.status(httpStatus.CREATED).send(user);
});


const updateNotification  = catchAsync(async (req, res) => {
  const { notificationId } = req.params;
  let userID = req?.user?._id
  const user = await notificationService.updateNotification(notificationId, userID);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createNotification,
  getAllNotification,
  getNotification,
  updateNotification
};
