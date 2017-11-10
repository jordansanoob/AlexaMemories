'use strict';

var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

var dynamoHelper = function () {
    return {
        putObject: function (tableName, object, callback) {
            var params = {
                "TableName": tableName,
                "Item": object
            };
            dynamo.put(params, function (err, data) {
                callback(err, data);
            });
        },
        getAttribute: function (tableName, keyName, callback) {
            var params = {
                "TableName": tableName,
                "Key": {
                    //key you want
                },
                "AttributesToGet": [
                    //attribute you want
                ]
            };
            dynamo.get(params, function (err, data) {
                callback(err, data);
            });
        }
    }
}();
module.exports = dynamoHelper;