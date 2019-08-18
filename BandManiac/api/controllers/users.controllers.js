var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var Promise = require('promise');
var Q = require('q');


// Description:
//Registration- if first member, then assign vote 1, make active, etc.. If not first member, get vote numbers of all ACTIVE members, and assign a vote number not yet taken, make pending status, etc.

// Login - only let ACTIVE members login

// Changes to Membership- get vote numbers of all ACTIVE members. 
// -- If change is setting to TRUE, see if ALL ACTIVE members have voted (bandstatusv1, v2, etc.) TRUE (these are the
//     bandstatusV# values on the target's user record/document)
// --> if so, change target's status to ACTIVE. 
// -- If change is setting to FALSE, see if ALL ACTIVE members (LESS ONE) have voted (bandstatusv1, v2, etc.) FALSE
// --> if so, change target's status to PENDING (?) OR SOLO(?). I think an additional button should offer to DELETE the member 
// (which is merely deleting the member's history from the current band.... i.e. song votes, membership votes, etc.) 
// so that membership "slot"/vote number can be re-used for a new member.

module.exports.register = function(req, res) {
    var numActiveMembers = 0;
    var assignVoteNumber = 0;
    var pendingCount = 0;
    User
        // .find({'bandid':req.body.bandid,  bandstatus: 'active'})   //NOTE: bandid is ALL LOWER CASE in the User model 
        .find({'bandid':req.body.bandid})   //NOTE: bandid is ALL LOWER CASE in the User model 
        .exec().then(function(bandmembers) {         
                console.log("Found bandmembers", bandmembers.length);
                bandmembers.forEach(function(member) {
                    if (member.bandstatus === 'pending') {
                        pendingCount++;                   
                    };             
                });
                if (pendingCount > 0) {
                    // if band already has one pending member, just return with error message
                    res.status(403).json("PENDING Bandmember Already Exists. Each band can only have ONE PENDING member at a time. Please contact an ACTIVE member of the band.");    
                } else {
                    numActiveMembers = bandmembers.length;
                    console.log(bandmembers.toString());
                    let possibleVoteNumberArray = ['1','2','3','4','5'];

                    bandmembers.forEach(function(member) {
                        console.log("active member vote number:" + member.votenumber);
                        switch (member.votenumber) {
                            case '1':
                                possibleVoteNumberArray.splice( possibleVoteNumberArray.indexOf('1'), 1 );
                            break;
                            case '2':
                                possibleVoteNumberArray.splice( possibleVoteNumberArray.indexOf('2'), 1 );
                            break;
                            case '3':
                                possibleVoteNumberArray.splice( possibleVoteNumberArray.indexOf('3'), 1 );
                            break;
                            case '4':
                                possibleVoteNumberArray.splice( possibleVoteNumberArray.indexOf('4'), 1 );
                            break;
                            case '5':
                                possibleVoteNumberArray.splice( possibleVoteNumberArray.indexOf('5'), 1 );
                            break;
                            default:
                                console.log('this should not happen - assigning band member vote number');
                        }
                        if (possibleVoteNumberArray.length > 0) {
                            assignVoteNumber = possibleVoteNumberArray.sort()[0];
                            console.log("assign vote number is: " + assignVoteNumber);
                        }        
                    });

                    console.log('registering user');
                    // put this new user into PENDING status, so other band members have to approve 
                    // before this user gets access to band info
                    var now = moment().format('YYYYMMDD');
                    var username = req.body.username;                                      
                    var name = req.body.name || null;
                    var password = req.body.password;
                    var bandid = req.body.bandid || null;
                    var votenumber = assignVoteNumber;
                    var bandstatusv1 = 'false';
                    var bandstatus = 'pending';
                    if (numActiveMembers === 0) {
                        console.log("why inside numActiveMembers equal 0?");
                        votenumber = '1';
                        assignVoteNumber = '1';
                        bandstatusv1 = 'true';
                        bandstatus = 'active';
                    }

                    var bandstatusv1 = assignVoteNumber === '1' ? 'true' : null;
                    var bandstatusv2 = assignVoteNumber === '2' ? 'true' : null;
                    var bandstatusv3 = assignVoteNumber === '3' ? 'true' : null;
                    var bandstatusv4 = assignVoteNumber === '4' ? 'true' : null;
                    var bandstatusv5 = assignVoteNumber === '5' ? 'true' : null;
                    var bandstatustime = req.body.bandstatustime || null;
                    var subscriptionstatus = req.body.subscriptionstatus || null;
                    var subscriptionstatustime = req.body.subscriptionstatustime || null;
                    var signuptime = req.body.signuptime || now;
                    var phonenumber = req.body.phonenumber || null;
                
                    User.create({
                        username: username,
                        name: name,
                        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                        bandid: bandid,
                        votenumber: votenumber,
                        bandstatusv1: bandstatusv1,
                        bandstatusv2: bandstatusv2,
                        bandstatusv3: bandstatusv3,
                        bandstatusv4: bandstatusv4,
                        bandstatusv5: bandstatusv5,
                        bandstatus: bandstatus,
                        bandstatustime: bandstatustime,
                        subscriptionstatus: subscriptionstatus,
                        subscriptionstatustime: subscriptionstatustime,
                        signuptime: signuptime,
                        phonenumber: phonenumber
                    }, function(err, user) {
                        if (err) {
                            console.log(err);
                            res.status(400).json(err);
                        } else {
                            console.log('user created', user);
                            res.status(201).json(user);
                        }
                    });
                };
    });
};

module.exports.login = function(req, res) {
    console.log('logging in user');
    var username = req.body.username;
    var password = req.body.password;

    //Need to check bandstatus to determine if user is
    // PENDING - new user
    // ACTIVE - can login and access band information
    

    User.findOne({
        username: username, bandstatus: 'active'
    }).exec(function(err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        console.log('User found', user);
                        console.log('Login Vote Number is: ', user.votenumber);
                        var token = jwt.sign({username: user.username, bandid: user.bandid, votenumber: user.votenumber}, 's3cr3t', { expiresIn: 3600});
                        res.status(200).json({success: true, token: token});  
                    } else {
                        res.status(401).json('Unauthorized');
                        console.log('Unauthorized attempt 1');
                    }
                } else {
                    res.status(401).json('Unauthorized'); 
                    console.log('Unauthorized attempt 2');
                };
       
    });
};

module.exports.authenticate = function(req, res, next) {
    var headerExists = req.headers.authorization;
    if(headerExists){
        var token = req.headers.authorization.split(' ')[1];  //--> Authorization Bearer xxx
        jwt.verify(token, 's3cr3t', function(error, decoded){
            if (error) {
                console.log(error);
                res.status(401).json('Unauthorized');
            } else {
                req.user = decoded.username;
                req.bandid = decoded.bandid;
                req.votenumber = decoded.votenumber;
                console.log("decoded is: " + decoded);
                console.log("token is: " + token);
                console.log("authenticate bandid: " + decoded.bandid);
                console.log("authenticate votenumber: " + decoded.votenumber);
                next();
            }
        });
    } else {
        res.status(403).json('No token provided');
    }
};

module.exports.getBandMembers = function(req, res) {
    console.log('getting band members');
    console.log('Request bandid is: ' + req.bandid);
    User
        .find({'bandid':req.bandid})   //NOTE: bandid is ALL LOWER CASE in the User model 
        .exec(function(err, bandmembers) {
            if (err){
                console.log("Error finding band members");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found bandmembers", bandmembers.length);
                res
                    .json(bandmembers);
            }              
        });
};

module.exports.getActiveBandMembers = function(req, res) {
    console.log('getting ACTIVE band members');
    console.log('Request bandid is: ' + req.bandid);
    User
        .find({'bandid':req.bandid, bandstatus:'active'})   //NOTE: bandid is ALL LOWER CASE in the User model 
        .exec(function(err, bandmembers) {
            if (err){
                console.log("Error finding ACTIVE band members");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found ACTIVE bandmembers", bandmembers.length);
                res
                    .json(bandmembers);
            }              
        });
};

module.exports.updateVote = function(req, res) {
    //need to grab vm.voteNum and retrieve that user (the TARGET of the update)
    //need to grab vm.votenumber (the SOURCE of the update) and use it to determine the bandstatusV# (assigned vote # of user making the change)
    //to to copy from the vm.bandMembers[] (in-memory members, one of which is target of the update) with matching ._id 
    //to url param (target of the update)
    // (since in-memory bandstatusv# value is correct... now need to persist it to db)

    console.log('update membership vote');
    console.log('Request bandid is: ' + req.bandid);
    console.log('Request voteNum (target) is: ' + req.body.voteNum);
    console.log('Request votenumber (source) is: ' + req.body.votenumber);
    console.log('Target user name is: ' + req.body.targetUserName);
    let votenumberFieldName = 'votenumber';
    let bandstatusvx = 'bandstatusv' + req.body.voteNum;
    var activeBandmembers = [];
    var allTrue = "true";

    User
    .find({'bandid':req.bandid, bandstatus:'active'})   //NOTE: bandid is ALL LOWER CASE in the User model 
    .exec(function(err, bandmembers) {
        if (err){
            console.log("Error getting all ACTIVE band members");
           
        } else {
            console.log("Got all ACTIVE bandmembers", bandmembers.length);
            bandmembers.forEach(function(member) {
                console.log(member.login + " is an ACTIVE member");
                activeBandmembers.push(member);   
            });

        }              
    });

    //db.foo.updateMany({}, {$set: {lastLookedAt: Date.now() / 1000}})

    // User
    // .updateMany({'bandid':req.bandid, bandstatus:'active'}, {$set: {[bandstatusvx]:"true"}})   //NOTE: bandid is ALL LOWER CASE in the User model 
    // .exec(function(err, bandmembers2) {
    //     if (err){
    //         console.log("Error updating all ACTIVE bandmembers2");        
    //     } else {
    //         console.log("Updated all ACTIVE bandmembers", bandmembers.length);
    //     }              
    // });

    User
        .findOne({'bandid':req.bandid, [votenumberFieldName]:req.body.voteNum, 'username':req.body.targetUserName})   //NOTE: bandid is ALL LOWER CASE in the User model 
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err){
                console.log("Error finding bandmember");
                response.status=500;
                response.message = err;
            } else if(!doc) {
                console.log("bandmemeber not found" );
                response.status=404
                response.message = {
                    "message" : "Bandmember was not found"
                };
            }

            if(response.status !== 200) {
                console.log("Not equal 200 response statues from updateVote. response.status is = " + response.status);
            res
                .status(response.status)
                .json(response.message);
            } else {
                doc.username = doc.username;
                doc.name =  doc.name;
                doc.password =  doc.password;
                doc.bandid = doc.bandid;    
                doc.votenumber = doc.votenumber
                doc.bandstatusv1 = req.body.votenumber === '1' ? req.body.voteValue : doc.bandstatusv1;  
                doc.bandstatusv2 = req.body.votenumber === '2' ? req.body.voteValue : doc.bandstatusv2;  
                doc.bandstatusv3 = req.body.votenumber === '3' ? req.body.voteValue : doc.bandstatusv3;  
                doc.bandstatusv4 = req.body.votenumber === '4' ? req.body.voteValue : doc.bandstatusv4; 
                doc.bandstatusv5 = req.body.votenumber === '5' ? req.body.voteValue : doc.bandstatusv5; 
                // EVALUATE FOR ACTIVE
                if (req.body.voteValue === 'true') {
                    activeBandmembers.forEach(function(aMember) {
                        console.log(aMember.username + " voted");
                        switch (aMember.votenumber) {
                            case '1':
                            allTrue = doc.bandstatusv1 !== "true" ? "false" : allTrue;
                            break;
                            case '2':
                            allTrue = doc.bandstatusv2 !== "true" ? "false" : allTrue;
                            break;
                            case '3':
                            allTrue = doc.bandstatusv3 !== "true" ? "false" : allTrue;
                            break;
                            case '4':
                            allTrue = doc.bandstatusv4 !== "true" ? "false" : allTrue;
                            break;
                            case '5':
                            allTrue = doc.bandstatusv5 !== "true" ? "false" : allTrue;
                            break;
                            default:
                                console.log('this should not happen - assigning band member vote number');
                        }
                    });
                    if (allTrue === "true") {
                        User
                        .updateMany({'bandid':req.bandid, bandstatus:'active'}, {$set: {[bandstatusvx]:"true"}})   //NOTE: bandid is ALL LOWER CASE in the User model 
                        .exec(function(err, bandmembers2) {
                            if (err){
                                console.log("Error updating all ACTIVE bandmembers2");        
                            } else {
                                console.log("Updated all ACTIVE bandmembers2");
                            }              
                        });
                        doc.bandstatus = 'active';
                    }
                }
        
                // To Do: 1. have the votenumber of registered users vote true for themselves at time of registration
                //      : 2. reduce pending status to just require activeBandmembers.length -1 

                // if (req.body.voteValue === 'true' && (
                //     doc.bandstatusv1 === 'true' &&
                //     doc.bandstatusv2 === 'true' &&
                //     doc.bandstatusv3 === 'true' &&
                //     doc.bandstatusv4 === 'true' &&
                //     doc.bandstatusv5 === 'true')) {
                //         doc.bandstatus = 'active';
                // }
                // EVALUATE FOR PENDING
                
                if (req.body.voteValue === 'false') {
                    var falseCount = 0;
                    activeBandmembers.forEach(function(aMember) {
                        console.log(aMember.login + " find false votes");
                        switch (aMember.votenumber) {
                            case '1':
                                if (doc.bandstatusv1 === 'false') falseCount++;
                                break;
                            case '2':
                                if (doc.bandstatusv2 === 'false') falseCount++;
                                break;
                            case '3':
                                if (doc.bandstatusv3 === 'false') falseCount++;
                                break;
                            case '4':
                                if (doc.bandstatusv4 === 'false') falseCount++;
                                break;
                            case '5':
                                if (doc.bandstatusv5 === 'false') falseCount++;
                                break;
                            default:
                                console.log('this should not happen - tabulating false votes');
                        }
                    });
                    if (falseCount === (activeBandmembers.length - 1)) {
                        doc.bandstatus = 'pending';
                    };
                };

                // if (doc.bandstatusv1 === 'false') falseCount++;
                // if (doc.bandstatusv2 === 'false') falseCount++;
                // if (doc.bandstatusv3 === 'false') falseCount++;
                // if (doc.bandstatusv4 === 'false') falseCount++;
                // if (doc.bandstatusv5 === 'false') falseCount++;
                // if (req.body.voteValue === 'false' && falseCount >= 4) {
                //         console.log("switch to pending" );
                //         doc.bandstatus = 'pending';
                // }
                doc.bandstatus =  doc.bandstatus;
                doc.bandstatustime = doc.bandstatustime;
                doc.subscriptionstatus = doc.subscriptionstatus;
                doc.subscriptionstatustime = doc.subscriptionstatustime;
                doc.signuptime = doc.signuptime; 
                doc.phonenumber = doc.phonenumber;
                doc.save(function(err, userUpdated) {
                    if(err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json(userUpdated);
                    }
                });
            }



        });
};
    //    The Profile screen page only shows how the user is voting, NOT how users have voted on him/her
    //    for example if the only adverse vote is Baxter (votenumber 2) voting to remove Rizzo (votenumber 1), 
    //    Baxter would see on his Profile page: 
    //              Rizzo:  False
    //              Baxter: True
    //              Gigi:   True
    //              Lucky:  True
    //              Lassie: True
    //
    //    Rizzo would see on his Profile page:
    //              Rizzo:  True
    //              Baxter: True
    //              Gigi:   True
    //              Lucky:  True
    //              Lassie: True
    //
    //    Rizzo's user db record (which Rizzo can't see) would have:
    //              bandstatusv1: True      (populated from Rizzo's voting since he is votenumber 1)
    //              bandstatusv2: False     (populated from Baxter's voting since he is votenumber 2)
    //              bandstatusv3: True
    //              bandstatusv4: True
    //              bandstatusv5: True
    //
   //    Baxter's user db record (which Baxter can't see) would have:
    //              bandstatusv1: True      (populated from Rizzo's voting since he is votenumber 1)
    //              bandstatusv2: True      (populated from Baxter's voting since he is votenumber 2)
    //              bandstatusv3: True
    //              bandstatusv4: True
    //              bandstatusv5: True
    //
    //  To determine overall bandstatus of a member (in this example, Rizzo), query that members bandstatusv1, v2, v3, v4, v5 fields(*)
    //  --> if voteValue === true && if ALL (*) are TRUE --> set member's overall bandstatus to active
    //  --> if voteValue === false && if ALL (minus 1) (*) are FALSE --> set member's overall bandstatus back to pending
    //
    //
   