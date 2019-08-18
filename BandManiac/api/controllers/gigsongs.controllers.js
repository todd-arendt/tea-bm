var mongoose = require('mongoose');
var Gigsong = mongoose.model('Gigsong');

module.exports.gigsongsGetAll = function(req,res){
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

    Gigsong
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, gigsongs) {
            if (err){
                console.log("Error finding gigsongs");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found gigsongs", gigsongs.length);
                res
                    .json(gigsongs);
            }              
        });
};

module.exports.gigsongsGetOne = function(req,res){
    var gigListIdParam = req.params.gigsongId;  //yes, this name is wrong in this case
    var setBeingEdited = req.params.setBeingEdited;
    console.log("GET gigSongIdParam", req.params.gigsongId);
    console.log("GET gigListIdParam", gigListIdParam);
    
    Gigsong.findOne({
        gigListId: gigListIdParam
        }).exec(function(err, gigsong) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                if (gigsong) {
                    console.log('gigListIdParam found', gigListIdParam);
                    console.log('bandId found', gigsong.bandId);
                    // console.log('songName1 found', gigsong.songName1);
                    // console.log('songName2 found', gigsong.songName2);
                    console.log('gigListId found', gigsong.gigListId);
                }
                res.status(200).json({success: true, gigsong: gigsong});  
            }
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

module.exports.gigsongsAddOne = function(req,res){
    
    Gigsong
        .create({
            bandId : req.body.bandId,
            // songName1 : req.body.songName1,
            // songName2 : req.body.songName2,
            songsArray1 : req.body.songsArray1,
            songsArray2 : req.body.songsArray2,
            songsArray3 : req.body.songsArray3,
            songsArray4 : req.body.songsArray4,
            gigListId : req.body.gigListId
        }, function(err, gigsongs) {
            if (err) {
                console.log("Error creating gigsongs");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Gigsongs created", gigsongs);
                res
                    .status(201)
                    .json(gigsongs);
            }
        });


};

module.exports.gigsongsUpdateOne = function(req,res) {
    var gigListIdParam = req.params.gigsongId;  //yes, this name is wrong in this case
    console.log("GET gigListIdParam", gigListIdParam);
    
    Gigsong.findOne({
        gigListId: gigListIdParam
        }).exec(function(err, doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err){
                console.log("Error finding gigsongs");
                response.status=500;
                response.message = err;
            } else if(!doc) {
                console.log("Gigsong ID not found" );
                response.status=404
                response.message = {
                    "message" : "Gigsong ID not found"
                };
            }
            if(response.status !== 200) {
                console.log("Not equal 200 response statues from gigsongsUpdateOne findONe. response.status is = " + response.status);
            res
                .status(response.status)
                .json(response.message);
            } else {
                doc.bandId = req.body.bandId;
                // doc.songName1 = req.body.songName1;
                // doc.songName2 = req.body.songName2;
                doc.songsArray1 = req.body.songsArray1;
                doc.songsArray2 = req.body.songsArray2;
                doc.songsArray3 = req.body.songsArray3;
                doc.songsArray4 = req.body.songsArray4;
                doc.gigListId = req.body.gigListId;
                doc.save(function(err, gigsongsUpdated) {
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

module.exports.gigsongsDeleteOne = function(req, res) {
    var gigListIdParam = req.params.gigsongId;
    Gigsong
        .remove({gigListId: gigListIdParam})
        .exec(function(err, gigsongs) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Gigsongs deleted ");
                res
                    .status(204)
                    .json();
            }
        });

};