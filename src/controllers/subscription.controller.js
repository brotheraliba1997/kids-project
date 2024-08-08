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
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const user = await subscriptionService.getAllSubscription(filter,options);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createSubcription,
  getAllSubcription,
};
