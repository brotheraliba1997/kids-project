const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, languageService, ProgramService } = require('../services');

const createProgram = catchAsync(async (req, res) => {
  const user = await ProgramService.createProgram(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllPrograms = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const user = await ProgramService.getAllPrograms(filter,options);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});


const getProgram = catchAsync(async (req, res) => {
  const { programId } = req.params;
  const user = await ProgramService.getProgram(programId);
  res.status(httpStatus.CREATED).send(user);
});


const updateProgram = catchAsync(async (req, res) => {
  const { programId } = req.params;
  const user = await ProgramService.updateProgram(programId, req.body);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createProgram,
  getAllPrograms,
  updateProgram,
  getProgram
};
