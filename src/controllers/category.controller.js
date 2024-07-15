const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, categoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
  const user = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllCategory = catchAsync(async (req, res) => {
  const user = await categoryService.getAllCategory();
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createCategory,
  getAllCategory,
};
