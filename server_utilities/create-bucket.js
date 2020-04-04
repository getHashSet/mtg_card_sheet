const AWS = require('aws-sdk');
require("dotenv").config();

// ======================= //
// ======= AWS S3 ======== //
// ======================= //

// this code is designed to create AWS S3 buckets. Add your ID and Secret to then name your bucket something really unique on line 12. Once complete then run node create-bucket.js

// Params pulled from local .env file
const ID = process.env.S3_ID;
const SECRET = process.env.S3_SECRET;
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "eu-west-1"
    }
};

s3.createBucket(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket Created Successfully', data.Location);
});