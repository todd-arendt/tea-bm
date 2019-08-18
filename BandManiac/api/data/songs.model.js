var mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
    // name is a Path   String is schema type
    // this schema must be compiled into a model for use
    // this NESTED schema MUST be defined BEFORE its parent ... songSchema
    bandId : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    artist : {
        type : String,
        required : false
    },
    originalTuning : {
        type : String,
        required : false
    },
    ourTuning : {
        type : String,
        required : false
    },
    bpm : {
        type : String,
        required : false
    },
    starter : {
        type : String,
        required : false
    },
    leadVocal : {
        type : String,
        required : false
    },
    backupVocal : {
        type : String,
        required : false
    },
    leadGuitar : {
        type : String,
        required : false
    },
    rhythmGuitar : {
        type : String,
        required : false
    },
    note1 : {
        type : String,
        required : false
    },
    active : {
        type : Boolean,
        required : false
    },
    rank : {
        type : Number,
        min : 1,
        max : 5,
        required : false
    },
    vote1 : {
        type : Boolean,
        required : false
    },
    vote2 : {
        type : Boolean,
        required : false
    },
    vote3 : {
        type : Boolean,
        required : false
    },
    vote4 : {
        type : Boolean,
        required : false
    },
    vote5 : {
        type : Boolean,
        required : false
    },
    voteStatus : {
        type : String,
        required : false
    },
    custom1Name : {
        type : String,
        required : false
    },
    custom1Value : {
        type : String,
        required : false
    },
    custom2Name : {
        type : String,
        required : false
    },
    custom2Value : {
        type : String,
        required : false
    }
});

// 'Song' maps to a default collection of lower case pluralized 'songs' which is 
//  which is an option 3rd parameter
//  mongoose.model('Song', songSchema, 'songs');
//  If any embedded schemas in songSchema, they MUST be defined before compiling here.
mongoose.model('Song', songSchema, 'songs');