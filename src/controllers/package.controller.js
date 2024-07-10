const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService } = require('../services');

const createPackage = catchAsync(async (req, res) => {
  const user = await packageService.createPackage(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllPackages = catchAsync(async (req, res) => {
  const user = await packageService.getAllPackages();
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createPackage,
  getAllPackages,
};
