const AWS = require('aws-sdk');
require('dotenv').config(); // Ensure environment variables are loaded

const s3 = new AWS.S3({
  accessKeyId: "b66fb2c2c143b626a436ec1caa808431",
  secretAccessKey: "7b0b2f0e36f69ed390c425f173c334dab1ef8b0d4fa7f193555f059febf91cea",
//   region: process.env.BUCKET_REGION,
  signatureVersion: 'v4',
  endpoint: "https://5aa5d988e1bde0d278ab9f851dccfa85.r2.cloudflarestorage.com",

});

module.exports = s3;