const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, categoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
  const user = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const user = await categoryService.getAllCategory(filter, options);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

const updateCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const user = await categoryService.updateCategory(categoryId, req.body);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
};
