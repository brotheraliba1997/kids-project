const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, languageService, contactService } = require('../services');

const createContact = catchAsync(async (req, res) => {
  const user = await contactService.createContact(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllContact = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const user = await contactService.getAllContact(filter,options);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});


const getContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const user = await contactService.getContact(contactId);
  res.status(httpStatus.CREATED).send(user);
});


const updateContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const user = await contactService.updateContact(contactId, req.body);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createContact,
  getAllContact,
  getContact,
  updateContact
};
