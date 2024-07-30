const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService, VideoUploadService } = require('../services');

const GeneratePresigned = catchAsync(async (req, res) => {
  const user = await VideoUploadService.GeneratePresigned(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const StartMultipartUpload = catchAsync(async (req, res) => {
  const user = await VideoUploadService.StartMultipartUpload(req.body);
  console.log(user, "single");
  res.send(user);
});

const updateVideo = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const user = await VideoUploadService.updateVideos(videoId, req.body);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});


const CompleteMultipartUpload = catchAsync(async (req, res) => {
  const user = await VideoUploadService.CompleteMultipartUpload(req.body);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
})

const GenerateSinglePresigned = catchAsync(async (req, res) => {
  const user = await VideoUploadService.GenerateSinglePresigned(req.body);
  console.log(user, "userChal");
  res.status(httpStatus.CREATED).send(user);
})

module.exports = {
  GenerateSinglePresigned,
  StartMultipartUpload,
  updateVideo,
  CompleteMultipartUpload,
  GeneratePresigned
};
