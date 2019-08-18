var mongoose = require('mongoose');

var gigsongsSchema = new mongoose.Schema({
    // name is a Path   String is schema type
    // this schema must be compiled into a model for use
    // this NESTED schema MUST be defined BEFORE its parent ... gigSchema
    bandId : {
        type : String,
        required : true
    },
    // songsArray : {
    //     type : [String],
    //     required : false
    // },
    songsArray1 : [{
        songId : {type : String},
        set : {type : Number},
        songIndex : {type : Number}
    }],
    songsArray2 : [{
        songId : {type : String},
        set : {type : Number},
        songIndex : {type : Number}
    }],
    songsArray3: [{
        songId : {type : String},
        set : {type : Number},
        songIndex : {type : Number}
    }],
    songsArray4 : [{
        songId : {type : String},
        set : {type : Number},
        songIndex : {type : Number}
    }],
    gigListId : {
        type : String,
        required : false
    }
});

// 'Gig' maps to a default collection of lower case pluralized 'gigs' which is 
//  which is an option 3rd parameter
//  mongoose.model('Gig', gigSchema, 'gigs');
//  If any embedded schemas in gigSchema, they MUST be defined before compiling here.
mongoose.model('Gigsong', gigsongsSchema, 'gigsongs'); 