'use strict';

var Alexa = require('alexa-sdk');

const handlers = {
    "NewSession" : function(){

    },


    //upon launch into our application, what will it say?
    "LaunchRequest": function(){

    },


    //insert as many intents as we need
    "Intent": function(){

    },



    //built in intents
    "AMAZON.StopIntent": function(){

    },

    "AMAZON.CancelIntent": function(){

    },

    "AMAZON.HelpIntent" : function(){

    },


    //undefined intent should do something such as "could not understand that, try again"
    "Unhandled" : function() {

        
    //maybe an unhandled intent will randomally pick a response that way unhandled still feels conversational

    }

}



exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    registerHandlers(handlers);
    alexa.execute();
}
