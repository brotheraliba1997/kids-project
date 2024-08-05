const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, languageService, ProgramService, visitService } = require('../services');


const createVisit = catchAsync(async (req, res) => {
  const user = await visitService.createVisit(req);
  res.status(httpStatus.CREATED).send(user);
});

const getAllVisit = catchAsync(async (req, res) => {
  const user = await visitService.getAllVisit(req);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});









module.exports = {
  createVisit,
  getAllVisit
  
};
