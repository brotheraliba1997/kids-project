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
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const user = await packageService.getAllPackages(filter,options);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});


const getPackage = catchAsync(async (req, res) => {
  const { packageId } = req.params;
  const user = await packageService.getPackage(packageId);
  res.status(httpStatus.CREATED).send(user);
});


const updatePackage = catchAsync(async (req, res) => {
  const { packageId } = req.params;
  const user = await packageService.updatePackage(packageId, req.body);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createPackage,
  getAllPackages,
  getPackage,
  updatePackage
};
