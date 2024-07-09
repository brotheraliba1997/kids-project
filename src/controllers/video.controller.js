const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { videoService } = require('../services');

const createVideo = catchAsync(async (req, res) => {
  const user = await videoService.createVideo(req.body);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createVideo,
};
