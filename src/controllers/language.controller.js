const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, languageService, notificationService } = require('../services');
const { User } = require('../models');

const createLanguage = catchAsync(async (req, res) => {
  const parentUserIDs = await User.find({ role: 'parent' }).select('_id');
  const parentIDsArray = parentUserIDs.map((user) => user?._id.toString());
  let notificationMessgae = {
    title: 'new Language',
    description: 'A new Language is now active and available for you.',
    notificationType: 'Language Activation',
    user: parentIDsArray,
  };
  const user = await languageService.createLanguage(req.body);
  const Notification = await notificationService.createNotification(notificationMessgae);
  res.status(httpStatus.CREATED).send(user);
});

const getAllLanguages = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const user = await languageService.getAllLanguages(filter,options);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});


const getLanguage = catchAsync(async (req, res) => {
  const { languageId } = req.params;
  const user = await languageService.getLanguage(languageId);
  res.status(httpStatus.CREATED).send(user);
});


const updateLanguage = catchAsync(async (req, res) => {
  const { languageId } = req.params;
  const user = await languageService.updateLanguage(languageId, req.body);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createLanguage,
  getAllLanguages,
  updateLanguage,
  getLanguage
};
