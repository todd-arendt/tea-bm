var mongoose = require('mongoose');
var Song = mongoose.model('Song');

module.exports.songsGetAll = function(req,res){
    console.log('Requested by:  ' + req.user);
    var offset = 0;
    var count = 100;
    var maxCount = 100;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,100);
    }
    
    if(req.query && req.query.count){
        count = parseInt(req.query.count,100);
    }

    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message" : "If supplied in querystring count and offset should be numbers"
            })
        return;
    }

    if (count > maxCount) {
        res 
        .status(400)
        .json({
            "message" : "count must be no more than 10"
        });
        return;
    };

    Song
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, songs) {
            if (err){
                console.log("Error finding songs");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found songs", songs.length);
                res
                    .json(songs);
            }              
        });
};

module.exports.songsGetAllActive = function(req,res){
    console.log('Requested by:  ' + req.user);
    console.log('Request bandid is: ' + req.bandid);
    var offset = 0;
    var count = 100;
    var maxCount = 100;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,100);
    }
    
    if(req.query && req.query.count){
        count = parseInt(req.query.count,100);
    }

    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message" : "If supplied in querystring count and offset should be numbers"
            })
        return;
    }

    if (count > maxCount) {
        res 
        .status(400)
        .json({
            "message" : "count must be no more than 10"
        });
        return;
    };

    Song
        .find({'active':true, 'bandId':req.bandid})
        .skip(offset)
        .limit(count)
        .exec(function(err, songs) {
            if (err){
                console.log("Error finding active songs");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found active songs", songs.length);
                res
                    .json(songs);
            }              
        });
};

module.exports.songsGetAllInactive = function(req,res){
    console.log('Requested by:  ' + req.user);
    var offset = 0;
    var count = 100;
    var maxCount = 100;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,100);
    }
    
    if(req.query && req.query.count){
        count = parseInt(req.query.count,100);
    }

    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message" : "If supplied in querystring count and offset should be numbers"
            })
        return;
    }

    if (count > maxCount) {
        res 
        .status(400)
        .json({
            "message" : "count must be no more than 10"
        });
        return;
    };

    Song
        .find({ 
            $and : [  
                { $or: [{ 'active': {$exists:false}}, {'active':false}]},
                {'bandId':req.bandid}
                ]
            })
        .skip(offset)
        .limit(count)
        .exec(function(err, songs) {
            if (err){
                console.log("Error finding inactive songs");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found inactive songs", songs.length);
                res
                    .json(songs);
            }              
        });
};

module.exports.songsGetOne = function(req,res){
    var songId = req.params.songId;
    console.log("GET songId", songId);
    
    Song
        .findById(songId)
        .exec(function(err,doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err){
                console.log("Error finding song");
                response.status=500;
                response.message = err;
            } else if(!doc) {
                response.status=404
                response.message = {
                    "message" : "Song ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);
        });  
};

var splitArray = function(input){
    var output;
    if(input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
};

module.exports.songsAddOne = function(req,res){
    
    Song
        .create({
            bandId : req.body.bandId,
            title : req.body.title,
            artist : req.body.artist,
            originalTuning : req.body.originalTuning,
            ourTuning : req.body.ourTuning,
            bpm : req.body.bpm,
            starter : req.body.starter,
            leadVocal : req.body.leadVocal,
            backupVocal : req.body.backupVocal,
            leadGuitar : req.body.leadGuitar,
            rhythmGuitar : req.body.rhythmGuitar,
            note1 : req.body.note1,
            active : req.body.active,
            rank : 3,
            vote1 : req.body.vote1,
            vote2 : req.body.vote2,
            vote3 : req.body.vote3,
            vote4 : req.body.vote4,
            vote5 : req.body.vote5,
            voteStatus : req.body.voteStatus,
            custom1Name : req.body.custom1Name,
            custom1Value : req.body.custom1Value,
            custom2Name : req.body.custom2Name,
            custom2Value : req.body.custom2Value
        }, function(err, song) {
            if (err) {
                console.log("Error creating song");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Song created", song);
                res
                    .status(201)
                    .json(song);
            }
        });


};

module.exports.songsUpdateOne = function(req,res) {
    var songId = req.params.songId;
    console.log("GET songID", songId);
    
    Song
        .findById(songId)
        .exec(function(err,doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err){
                console.log("Error finding song");
                response.status=500;
                response.message = err;
            } else if(!doc) {
                response.status=404
                response.message = {
                    "message" : "Song ID not found"
                };
            }
            if(response.status !== 200) {
            res
                .status(response.status)
                .json(response.message);
            } else {
                doc.bandId = req.body.bandId;
                doc.title = req.body.title;
                doc.artist = req.body.artist;
                doc.originalTuning = req.body.originalTuning;
                doc.ourTuning = req.body.ourTuning;
                doc.bpm = req.body.bpm;
                doc.starter = req.body.starter;
                doc.leadVocal = req.body.leadVocal;
                doc.backupVocal = req.body.backupVocal;
                doc.leadGuitar = req.body.leadGuitar;
                doc.rhythmGuitar = req.body.rhythmGuitar;
                doc.note1 = req.body.note1;
                doc.active = req.body.active;
                doc.rank = 3;
                doc.vote1 = req.body.vote1;
                doc.vote2 = req.body.vote2;
                doc.vote3 = req.body.vote3;
                doc.vote4 = req.body.vote4;
                doc.vote5 = req.body.vote5;
                doc.voteStatus = req.body.voteStatus;
                doc.custom1Name = req.body.custom1Name;
                doc.custom1Value = req.body.custom1Value;
                doc.custom2Name = req.body.custom2Name;
                doc.custom2Value = req.body.custom2Value;

                doc.save(function(err, songUpdated) {
                    if(err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                });
            }
        });  
};

module.exports.songsDeleteOne = function(req, res) {
    var songId = req.params.songId;

    Song
        .findByIdAndRemove(songId)
        .exec(function(err, song) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Song deleted, id: ", songId);
                res
                    .status(204)
                    .json();
            }
        });

};