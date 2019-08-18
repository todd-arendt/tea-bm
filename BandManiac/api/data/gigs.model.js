var mongoose = require('mongoose');

var gigSchema = new mongoose.Schema({
    // name is a Path   String is schema type
    // this schema must be compiled into a model for use
    // this NESTED schema MUST be defined BEFORE its parent ... gigSchema
    bandId : {
        type : String,
        required : true
    },
    venue : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : false
    },
    startTime : {
        type : String,
        required : false
    },
    gigListId : {
        type : String,
        required : false
    },
    fee : {
        type : String,
        required : false
    },
    note : {
        type : String,
        required : false
    },
    schedule1 : {
        type : String,
        required : false
    },
    scheduleNote1 : {
        type : String,
        required : false
    },
    schedule2 : {
        type : String,
        required : false
    },
    scheduleNote2 : {
        type : String,
        required : false
    },
    schedule3 : {
        type : String,
        required : false
    },
    scheduleNote3 : {
        type : String,
        required : false
    },
    schedule4 : {
        type : String,
        required : false
    },
    scheduleNote4 : {
        type : String,
        required : false
    },
    schedule5 : {
        type : String,
        required : false
    },
    scheduleNote5 : {
        type : String,
        required : false
    },
    schedule6 : {
        type : String,
        required : false
    },
    scheduleNote6 : {
        type : String,
        required : false
    },
    schedule7 : {
        type : String,
        required : false
    },
    scheduleNote7 : {
        type : String,
        required : false
    }
});

// 'Gig' maps to a default collection of lower case pluralized 'gigs' which is 
//  which is an option 3rd parameter
//  mongoose.model('Gig', gigSchema, 'gigs');
//  If any embedded schemas in gigSchema, they MUST be defined before compiling here.
mongoose.model('Gig', gigSchema, 'gigs');