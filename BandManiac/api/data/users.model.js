var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    bandid: {
        type: String
    },   
    votenumber: {
        type: String
    },
    bandstatusv1: {
        type: String
    }, 
    bandstatusv2: {
        type: String
    }, 
    bandstatusv3: {
        type: String
    }, 
    bandstatusv4: {
        type: String
    }, 
    bandstatusv5: {
        type: String
    },
    bandstatus: {
        type: String
    },
    bandstatustime: {
        type: Date
    },
    subscriptionstatus: {
        type: String
    },
    subscriptionstatustime: {
        type: Date
    },
    signuptime: {
        type: Date
    },
    phonenumber: {
        type: String
    }         
});

mongoose.model('User', userSchema);