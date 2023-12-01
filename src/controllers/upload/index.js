// s3Upload.js
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3Client = new S3Client({
  // Set your AWS credentials and region here
  region: process.env.region,
  credentials: {
    accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  },
 maxBodyLength: Infinity, 
});

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 50, // 50 MB
  },
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.s3_bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    // acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        const path = 'media/'; // Specify the desired path
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + '-' + file.originalname;
        cb(null, path + filename); // Append the path to the filename
      }
  })
});

module.exports = upload;

