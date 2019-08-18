var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    bandId: {
        type: String,
        required : true
    },   
    gigId: {
        type: String,
        required : false
    },
    eventDate: {
        type: String,
        required : true
    }, 
    eventType: {
        type: String,
        required : true
    },
    eventDesc1: {
        type: String,
        required : false
    }, 
    eventDesc2: {
        type: String,
        required : false
    }, 
    addedBy: {
        type: String,
        required : false
    }
});

mongoose.model('Event', eventSchema);