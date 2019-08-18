var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var moment = require('moment');

module.exports.eventsGetAll = function(req,res){
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


    var now = moment().format('YYYYMMDD');
    console.log("This is now: " + now);

    Event
        .find({'bandId':req.bandid, 'eventDate': {$gte: now}})
        .sort( { eventDate: 1 } )
        .skip(offset)
        .limit(count)
        .exec(function(err, events) {
            if (err){
                console.log("Error finding events");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found events ", events.length);
                console.log("For bandid ", req.bandid);
                res
                    .json(events);
            }              
        });
};



module.exports.eventsDeleteByDate = function(req,res){
    var eventdate = req.params.date;
    console.log("GET event for date: ", eventdate);
    console.log("is BandId here:", req.bandid);
    Event
        .remove({'eventDate': eventdate,'bandId':req.bandid})
        .exec(function(err,doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err){
                console.log("Error finding event");
                response.status=500;
                response.message = err;
            } else if(!doc) {
                response.status=404
                response.message = {
                    "message" : "Event not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);
        });  
};

// var splitArray = function(input){
//     var output;
//     if(input && input.length > 0) {
//         output = input.split(";");
//     } else {
//         output = [];
//     }
//     return output;
// };

module.exports.eventsAddOne = function(req,res){
    
    Event
        .create({
            bandId : req.bandid,
            eventDate : req.body.eventDate,
            eventType : req.body.eventType,
            eventDesc1 : req.body.eventDesc1,
            eventDesc2 : req.body.eventDesc2
        }, function(err, event) {
            if (err) {
                console.log("Error creating event");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Event created", event);
                console.log("Event desc1",event.eventDesc1);
                res
                    .status(201)
                    .json(event);
            }
        });


};

module.exports.eventUpdate = function(req,res) {
    var eventId = req.params.eventId;
    console.log("GET eventID", eventId);
    
    Event
        .findById(eventId)
        .exec(function(err,doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err){
                console.log("Error finding event");
                response.status=500;
                response.message = err;
            } else if(!doc) {
                response.status=404
                response.message = {
                    "message" : "Event ID not found"
                };
            }
            if(response.status !== 200) {
            res
                .status(response.status)
                .json(response.message);
            } else {
                //doc.bandId = req.body.bandId;
                doc.eventDate = req.body.eventDate;
                doc.eventType = req.body.eventType;
                doc.eventDesc1 = req.body.eventDesc1;
                doc.eventDesc2 = req.body.eventDesc2;
                
                doc.save(function(err, eventUpdated) {
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

module.exports.eventsDeleteOne = function(req, res) {
    var eventId = req.params.eventId;

    Event
        .findByIdAndRemove(eventId)
        .exec(function(err, event) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("eventId deleted, id: ", eventId);
                res
                    .status(204)
                    .json();
            }
        });

 };