const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, languageService, ProgramService, notificationService } = require('../services');
const { User } = require('../models');

const createProgram = catchAsync(async (req, res) => {
  const parentUserIDs = await User.find({ role: 'parent' }).select('_id');
  const parentIDsArray = parentUserIDs.map((user) => user?._id.toString());
  let notificationMessgae = {
    title: 'Program',
    description: 'A new program is now active and available for you.',
    notificationType: 'Program Activation',
    user: parentIDsArray,
  };

  const user = await ProgramService.createProgram(req.body);
  const Notification = await notificationService.createNotification(notificationMessgae);
  res.status(httpStatus.CREATED).send(user);
});

const getAllPrograms = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const user = await ProgramService.getAllPrograms(filter, options);
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
  getProgram,
};
