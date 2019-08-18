var mongoose = require('mongoose');
var Gig = mongoose.model('Gig');

module.exports.gigsGetAll = function(req,res){
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

    Gig
        .find({'bandId':req.bandid})
        .skip(offset)
        .limit(count)
        .exec(function(err, gigs) {
            if (err){
                console.log("Error finding gigs");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found gigs", gigs.length);
                res
                    .json(gigs);
            }              
        });
};

module.exports.gigsGetOne = function(req,res){
    var gigId = req.params.gigId;
    console.log("GET gigId", gigId);
    
    Gig
        .findById(gigId)
        .exec(function(err,doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err){
                console.log("Error finding gig");
                response.status=500;
                response.message = err;
            } else if(!doc) {
                response.status=404
                response.message = {
                    "message" : "Gig ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);
        });  
};


module.exports.gigsPlayInfo = function(req,res){
    var gigListId = req.params.gigListId;
    console.log("gigsPlayInfo GET gigListId: ", gigListId);
    
    Gig
    .findOne({'gigListId': gigListId})
        .exec(function(err,doc) {
            
            var response = {
                status : 200,
                message : doc
            };
            if (err){
                console.log("Error finding gig");
                response.status=500;
                response.message = err;
            } else if(!doc) {
                response.status=404
                response.message = {
                    "message" : "Gig ID not found"
                };
            }
            console.log(response.message);
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

module.exports.gigsAddOne = function(req,res){
    
    Gig
        .create({
            bandId : req.bandid,
            venue : req.body.venue,
            date : req.body.date,
            startTime : req.body.startTime,
            gigListId : req.body.gigListId,
            fee : req.body.fee,
            note : req.body.note,
            schedule1 : req.body.schedule1,
            schedule2 : req.body.schedule2,
            schedule3 : req.body.schedule3,
            schedule4 : req.body.schedule4,
            schedule5 : req.body.schedule5,
            schedule6 : req.body.schedule6,
            schedule7 : req.body.schedule7,
            scheduleNote1 : req.body.scheduleNote1,
            scheduleNote2 : req.body.scheduleNote2,
            scheduleNote3 : req.body.scheduleNote3,
            scheduleNote4 : req.body.scheduleNote4,
            scheduleNote5 : req.body.scheduleNote5,
            scheduleNote6 : req.body.scheduleNote6,
            scheduleNote7 : req.body.scheduleNote7
        }, function(err, gig) {
            if (err) {
                console.log("Error creating gig");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Gig created", gig);
                res
                    .status(201)
                    .json(gig);
            }
        });


};

module.exports.gigsUpdateOne = function(req,res) {
    var gigId = req.params.gigId;
    console.log("GET gigId", gigId);
    
    Gig
        .findById(gigId)
        .exec(function(err,doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err){
                console.log("Error finding gig");
                response.status=500;
                response.message = err;
            } else if(!doc) {
                response.status=404
                response.message = {
                    "message" : "Gig ID not found"
                };
            }
            if(response.status !== 200) {
            res
                .status(response.status)
                .json(response.message);
            } else {
                doc.bandId = doc.bandId;
                doc.venue = req.body.venue;
                doc.date = req.body.date;
                doc.startTime = req.body.startTime;
                doc.gigListId = req.body.gigListId;
                doc.fee = req.body.fee;
                doc.note = req.body.note;
                doc.schedule1 = req.body.schedule1;
                doc.schedule2 = req.body.schedule2;
                doc.schedule3 = req.body.schedule3;
                doc.schedule4 = req.body.schedule4;
                doc.schedule5 = req.body.schedule5;
                doc.schedule6 = req.body.schedule6;
                doc.schedule7 = req.body.schedule7;
                doc.scheduleNote1 = req.body.scheduleNote1;
                doc.scheduleNote2 = req.body.scheduleNote2;
                doc.scheduleNote3 = req.body.scheduleNote3;
                doc.scheduleNote4 = req.body.scheduleNote4;
                doc.scheduleNote5 = req.body.scheduleNote5;
                doc.scheduleNote6 = req.body.scheduleNote6;
                doc.scheduleNote7 = req.body.scheduleNote7;
                doc.save(function(err, gigUpdated) {
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

module.exports.gigsDeleteOne = function(req, res) {
    var gigId = req.params.gigId;

    Gig
        .findByIdAndRemove(gigId)
        .exec(function(err, gig) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Gig deleted, id: ", gigId);
                res
                    .status(204)
                    .json();
            }
        });

};