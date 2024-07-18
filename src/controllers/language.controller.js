const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, languageService } = require('../services');

const createLanguage = catchAsync(async (req, res) => {
  const user = await languageService.createLanguage(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllLanguages = catchAsync(async (req, res) => {
  const user = await languageService.getAllLanguages();
  console.log(user);
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
};
