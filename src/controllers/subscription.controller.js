const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, subscriptionService, notificationService } = require('../services');
const { User } = require('../models');

const createSubcription = catchAsync(async (req, res) => {
  const { _id, firstName, lastName } = req.user;
  const adminUserIDs = await User.find({ role: 'admin' }).select('_id');
  const AdminIDsArray = adminUserIDs.map((user) => user?._id.toString());
  let notificationAdmin = {
    title: 'Subcription',
    description: `User ${firstName} ${lastName}  has successfully subscribed to the new program. Please review the details of the subscription.`,
    notificationType: 'Subcription Activation',
    user: AdminIDsArray,
  };
  const user = await subscriptionService.createSubscription(req.body, _id);
  const AdminNotification = await notificationService.createNotification(notificationAdmin);

  let notificationParent = {
    title: 'Subcription',
    description: `Hello ${firstName} ${lastName}, great news! A new program is now active and available for you. Click here to explore the details and get started.`,
    notificationType: 'Subcription Activation',
    user: _id,
  };
  const ParentNotification = await notificationService.createNotification(notificationParent);
  res.status(httpStatus.CREATED).send(user);
});

const getAllSubcription = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const user = await subscriptionService.getAllSubscription(filter, options);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createSubcription,
  getAllSubcription,
};
