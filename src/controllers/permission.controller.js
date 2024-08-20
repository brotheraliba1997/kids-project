const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, languageService, ProgramService, permissionService } = require('../services');

const createPermission = catchAsync(async (req, res) => {
  const user = await permissionService.createPermission(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllPermission = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const user = await permissionService.getAllPermission(filter,options);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

const getPermission = catchAsync(async (req, res) => {
  const { permissionId } = req.params;
  const user = await permissionService.getPermission(permissionId);
  res.status(httpStatus.CREATED).send(user);
});


const updatePermission = catchAsync(async (req, res) => {
  const { permissionId } = req.params;
  const user = await permissionService.updatePermissionById(permissionId, req.body);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  getAllPermission,
  createPermission,
  updatePermission,
  getPermission
  
};
