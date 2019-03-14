"use strict";

var Alexa = require('alexa-sdk');
var speech = require('./helpers/speech');
var config = require('./configuration.js');
var s3 = require('./helpers/s3');


function singleMemory(memory_array, speaker) {

    var max = memory_array.length;
    var min = 0;
    var random = Math.floor(Math.random() * (max - min)) + min;

    var single_memory = memory_array[random].replace("NAMEOFSPEAKER", speaker);

    return single_memory;

}

const handlers = {

    "NewSession": function () {
        var intentName;
        console.log(JSON.stringify(this.event))
        if (this.event.request.type === "LaunchRequest") {
            intentName = "LaunchRequest";
        }
        else if (this.event.request.type === "IntentRequest") {
            intentName = this.event.request.intent.name;
        }
        this.emit(intentName);
    },
    "LaunchRequest": function () {
        console.log("Launch Request")
        this.attributes["conversation_mode"] = true;
        respond.call(this, "");
    },

    "MemoryRequest": function () {
        console.log("Memory Intent Request")
        var response_name = "";
        var response_value = "";
        var cur_filename;
        var slots = this.event.request.intent.slots

        for (var slot in slots) {
            if (slots[slot].value !== undefined) {
                response_name = slots[slot].name;
                response_value = slots[slot].resolutions.resolutionsPerAuthority[0].values[0].value.name;

                console.log(response_name);
                console.log(response_value);


                switch (response_value) {
                    case "RACHEL":
                        console.log("Rachel switch met.");
                        cur_filename = config.rachel;
                        break;

                    case "JASON":
                        console.log("Jason switch met");
                        cur_filename = config.jason
                        break;

                    case "JORDAN":
                        console.log("Jordan switch met.");
                        cur_filename = config.jordan;
                        break;

                    default:
                        break;
                }
            } else {
                cur_filename = config.misc;
            }
            s3.getObject(cur_filename, config.bucket, null, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    var messageArray = data.Body.toString('utf-8').split("%,");
                    var memory = singleMemory(messageArray, response_value);
                    console.log(memory);
                }
                this.emit(":tell", memory);
            });
        }
    },

    "SessionEndedRequest": function () {
        console.log("Session Ended Request")
    },
    "AMAZON.StartOverIntent": function () {
        console.log("Start Over Intent")
    },
    "AMAZON.StopIntent": function () {
        console.log("Stop Intent")
    },
    "AMAZON.CancelIntent": function () {
        console.log("Cancel Intent")
    },
    "AMAZON.HelpIntent": function () {
        console.log("Help Intent")
    },
    "Unhandled": function () {
        console.log("Unhandled")
    }
}


exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = config.appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
}