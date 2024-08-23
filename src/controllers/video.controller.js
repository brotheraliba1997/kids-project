const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, videoService } = require('../services');

const createVideo = catchAsync(async (req, res) => {
  const user = await videoService.createVideo(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getSingleVideo = catchAsync(async (req, res) => {
  const user = await videoService.getUserById(req.params.videoId);
  if (!user) {

    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getAllVideos = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const user = await videoService.getAllVideos(filter, options);

  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

const updateVideo = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const user = await videoService.updateVideos(videoId, req.body);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createVideo,
  getAllVideos,
  updateVideo,
  getSingleVideo
};
