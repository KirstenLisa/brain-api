const express = require('express');
const aws = require('aws-sdk');
const { S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('../config.js');

const awsRouter = express.Router()
const jsonBodyParser = express.json()

//aws.config.region = 'us-east-2';
//aws.config.update({ accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY, region: 'us-east-2' });
//let creds = new aws.Credentials(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, 'session');
//let creds = new aws.Credentials('akid', 'secret', 'session');

aws.config.update({
    region: "eu-central-1",
    endpoint: 's3-eu-central-1.amazonaws.com',
    signatureVersion: 'v4',
    //credentials: creds
 });
//console.log(S3_BUCKET);
console.log(process.env.S3_BUCKET);
console.log(aws.config);

awsRouter
  .get('/', (req, res) => {
      console.log('aws router');
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
    console.log(s3Params);
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });

module.exports = awsRouter;