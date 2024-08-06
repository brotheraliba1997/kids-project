const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, subscriptionService } = require('../services');

const createSubcription = catchAsync(async (req, res) => {
  const user = await subscriptionService.createSubscription(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllSubcription = catchAsync(async (req, res) => {
  const user = await subscriptionService.getAllSubscription();
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createSubcription,
  getAllSubcription,
};
