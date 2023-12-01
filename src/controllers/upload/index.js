// // s3Upload.js
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// const multer = require('multer');
// const multerS3 = require('multer-s3');

// const s3Client = new S3Client({
//   // Set your AWS credentials and region here
//   region: process.env.region,
//   credentials: {
//     accessKeyId: process.env.accessKeyId,
//   secretAccessKey: process.env.secretAccessKey,
//   },
//  maxBodyLength: Infinity, 
// });

// const upload = multer({
//   limits: {
//     fileSize: 1024 * 1024 * 50, // 50 MB
//   },
//   storage: multerS3({
//     s3: s3Client,
//     bucket: process.env.s3_bucket,
//     contentType: multerS3.AUTO_CONTENT_TYPE, 
//     // acl: 'public-read',
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//         const path = 'media/'; // Specify the desired path
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const filename = uniqueSuffix + '-' + file.originalname;
//         cb(null, path + filename); // Append the path to the filename
//       }
//   })
// });

// module.exports = upload;

const { S3Client, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand } = require("@aws-sdk/client-s3");
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');

const s3Client = new S3Client({
  region: process.env.region,
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.s3_bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const path = 'media/';
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = uniqueSuffix + '-' + file.originalname;
      cb(null, path + filename);
    },
    // Implementing Multipart Upload
    shouldTransform: (req, file, cb) => {
      cb(null, /^video/i.test(file.mimetype)); // You can adjust this condition based on file types
    },
    transformFile: (req, file, cb) => {
      // Initiate Multipart Upload
      const params = { Bucket: process.env.s3_bucket, Key: file.key };
      const multipartUpload = new CreateMultipartUploadCommand(params);
      s3Client.send(multipartUpload).then((data) => {
        const uploadId = data.UploadId;

        // Read the file and split it into parts
        const fileStream = fs.createReadStream(file.path);
        const partSize = 5 * 1024 * 1024; // 5 MB parts (adjust as needed)
        let partNumber = 0;

        function uploadPart() {
          partNumber++;
          const params = {
            Bucket: process.env.s3_bucket,
            Key: file.key,
            UploadId: uploadId,
            PartNumber: partNumber,
            Body: fileStream.read(partSize),
          };
          
          const uploadPartCommand = new UploadPartCommand(params);
          s3Client.send(uploadPartCommand).then((data) => {
            if (fileStream.readableEnded) {
              // All parts uploaded, complete the multipart upload
              const params = {
                Bucket: process.env.s3_bucket,
                Key: file.key,
                UploadId: uploadId,
                MultipartUpload: { Parts: data.ETagList.map((etag, index) => ({ ETag: etag, PartNumber: index + 1 })) },
              };
              const completeUploadCommand = new CompleteMultipartUploadCommand(params);
              s3Client.send(completeUploadCommand).then(() => cb(null, true)).catch(cb);
            } else {
              // Continue uploading parts
              uploadPart();
            }
          }).catch(cb);
        }

        // Start uploading parts
        uploadPart();
      }).catch(cb);
    },
  }),
});

module.exports = upload;
