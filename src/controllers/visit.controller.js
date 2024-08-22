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
  const visit = await visitService.getAllVisit();
  if (!visit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.status(httpStatus.CREATED).send({visit});
});


const getParentVisit = catchAsync(async (req, res) => {
  const visit = await visitService.getParentVisit();
  if (!visit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.status(httpStatus.CREATED).send({visit});
});









module.exports = {
  createVisit,
  getAllVisit,
  getParentVisit
  
};
