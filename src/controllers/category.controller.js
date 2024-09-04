const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, categoryService, notificationService } = require('../services');
const { User } = require('../models');

const createCategory = catchAsync(async (req, res) => {
  const parentUserIDs = await User.find({ role: 'parent' }).select('_id');
  const parentIDsArray = parentUserIDs.map((user) => user?._id.toString());
  let notificationMessgae = {
    title: 'new Category',
    description: 'A new Category is now active and available for you.',
    notificationType: 'Category Activation',
    user: parentIDsArray,
  };
  const user = await categoryService.createCategory(req.body);
  const Notification = await notificationService.createNotification(notificationMessgae);
  res.status(httpStatus.CREATED).send(user);
});

const getCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const user = await categoryService.getCategory(categoryId);
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
  getCategory
};
