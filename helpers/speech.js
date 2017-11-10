'use strict'

const Alexa = require('alexa-sdk');
var s3 = require('./s3');
var config = require('../configuration');


var speech = function () {
    return {
        tell: function (path) {
            s3.getObject(path, config.bucket_name, null, (err, data) => {
                if (data) {
                    this.emit(':tell', data.Body.toString('utf-8'));
                } else {
                    console.log(err, err.stack);
                }
            })
        },

        ask: function (path, rpath, state) {
            s3.getObject(path, config.bucket_name, null, (err, data) => {
                if (data) {
                    s3.getObject(rpath, config.bucket_name, null, (err, data2) => {
                        if (data2) {
                            if (state) {
                                this.emitWithState(':ask', data.Body.toString('utf-8'), data2.Body.toString('utf-8'))
                            } else {
                                this.emit(':ask', data.Body.toString('utf-8'), data2.Body.toString('utf-8'));
                            }
                        }
                        else {
                            console.log(err, err.stack);
                        }
                    });
                } else {
                    console.log(err, err.stack);
                }
            });
        }
    }
}