const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, languageService, contactService, notificationService } = require('../services');
const { User } = require('../models');

const createContact = catchAsync(async (req, res) => {

  const parentUserIDs = await User.find({ role: 'parent' }).select('_id');
  const parentIDsArray = parentUserIDs.map((user) => user?._id.toString());
  let notificationMessgae = {
    title: 'new Contact',
    description: 'A new Contact is now active and available for you.',
    notificationType: 'Contact Activation',
    user: parentIDsArray,
  };
  const Notification = await notificationService.createNotification(notificationMessgae);
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
