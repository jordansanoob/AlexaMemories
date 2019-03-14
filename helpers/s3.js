'use strict';

var AWS = require("aws-sdk");
var s3 = new AWS.S3();

var s3Helper = function () {
    return {
        // Get file from S3
        getObject: function (fileName, bucketName, versionId, callback) {
            var params = {
                Bucket: bucketName,
                Key: fileName
            };
            if (versionId) {
                params.VersionId = versionId;
            }
            s3.getObject(params, function (err, data) {
                callback(err, data);
            });
        },
        // Put file into S3
        putObject: function (fileName, bucketName, data, callback) {
            var params = {
                Bucket: bucketName,
                Key: fileName,
                Body: data
            };
            s3.putObject(params, function (err, data) {
                callback(err, data);
            });
        },
        // Delete file from S3
        deleteObject: function (fileName, bucketName, versionId, callback) {
            var params = {
                Bucket: bucketName,
                Key: fileName,
                VersionId: versionId
            };
            s3.deleteObject(params, function (err, data) {
                callback(err, data);
            })
        }
    };
}();

module.exports = s3Helper;