const httpStatus = require('http-status');
const { Video, UploadVideo } = require('../models');
const ApiError = require('../utils/ApiError');
const s3 = require('../config/s3');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const GeneratePresigned = async (userBody) => {
  const { fileName, uploadId, partNumbers } = userBody;
  const key = fileName;
  const totalParts = Array.from({ length: partNumbers }, (_, i) => i + 1);
  try {
    const presignedUrls = await Promise.all(
      totalParts.map(async (partNumber) => {
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: key,
          PartNumber: partNumber,
          UploadId: uploadId,
          Expires: 3600 * 3,
        };

        return s3.getSignedUrl('uploadPart', {
          ...params,
        });
      })
    );
    return { presignedUrls };
  } catch (error) {
    console.error('Error generating pre-signed URLs:', error);
    // return res.status(500).json({ error: "Error generating pre-signed URLs" });
    return null;
  }
};

const StartMultipartUpload = async (userBody) => {
  let fileName = userBody.fileName;
  let contentType = userBody.contentType;
  const key = fileName;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };

  // add extra params if content type is video
  if (contentType == 'VIDEO') {
    params.ContentDisposition = 'inline';
    params.ContentType = 'video/mp4';
  }

  try {
    const multipart = await s3.createMultipartUpload(params).promise();

    console.log(multipart, 'UploadId-');
    return { uploadId: multipart.UploadId };
  } catch (error) {
    console.error('Error starting multipart upload:', error);
    // return res.status(500).json({ error: "Error starting multipart upload" });
    return null;
  }
};
const updateVideos = async (id, updateBody) => {
  const updateOneVideo = await UploadVideo.findById(id);
  if (!updateOneVideo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'language not found');
  }
  Object.assign(updateOneVideo, updateBody);
  await updateOneVideo.save();
  return updateOneVideo;
};

const CompleteMultipartUpload = async (updateBody) => {
  let fileName = updateBody.fileName;
  let uploadId = updateBody.uploadId;
  let parts = updateBody.parts;
  const key = fileName;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    UploadId: uploadId,

    MultipartUpload: {
      Parts: parts.map((part, index) => ({
        ETag: part.etag,
        PartNumber: index + 1,
      })),
    },
  };
  try {
    const data = await s3.completeMultipartUpload(params).promise();
    console.log(data, 'link');
    return { fileData: data };
  } catch (error) {
    console.error('Error completing multipart upload:', error);
    // return res.status(500).json({ error: "Error completing multipart upload" });
    return null;
  }
};

const GenerateSinglePresigned = async (updateBody) => {
  const fileName = updateBody.fileName;
  const key = fileName;
  console.log(fileName, "fileName")

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Expires: 60, // Expires in 60 seconds
    // ACL: 'bucket-owner-full-control',
  };
  try {
    let url = await s3.getSignedUrlPromise('putObject', params);
    console.log(url, 'url asok');
    return { url };
  } catch (err) {
    console.log(err, "errorajate");
    return null;
  }
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */

module.exports = {
  GenerateSinglePresigned,
  GeneratePresigned,
  StartMultipartUpload,
  updateVideos,
  CompleteMultipartUpload,
};
