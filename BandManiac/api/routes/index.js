var express = require('express');
var router = express.Router();
var ctrlSongs = require('../controllers/songs.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlGigs = require('../controllers/gigs.controllers.js');
var ctrlGigsongs = require('../controllers/gigsongs.controllers.js');
var ctrlEvents = require('../controllers/events.controllers.js');

router
    .route('/songs')
    .get(ctrlUsers.authenticate, ctrlSongs.songsGetAll)
    .post(ctrlSongs.songsAddOne);

router
    .route('/songs/:songId')
    .get(ctrlUsers.authenticate, ctrlSongs.songsGetOne)
    .put(ctrlSongs.songsUpdateOne)
    .delete(ctrlSongs.songsDeleteOne);

router
    .route('/activesongs')
    .get(ctrlUsers.authenticate, ctrlSongs.songsGetAllActive)
    
router
    .route('/inactivesongs')
    .get(ctrlUsers.authenticate, ctrlSongs.songsGetAllInactive)

router
    .route('/playGigDisplay/:gigListId')
    .get(ctrlGigs.gigsPlayInfo);

router
    .route('/gigs')
    .get(ctrlUsers.authenticate, ctrlGigs.gigsGetAll)
    .post(ctrlUsers.authenticate, ctrlGigs.gigsAddOne);

router
    .route('/playselect')
    .get(ctrlUsers.authenticate, ctrlGigs.gigsGetAll);

router
    .route('/gigs/:gigId')
    .get(ctrlGigs.gigsGetOne)
    .put(ctrlGigs.gigsUpdateOne)
    .delete(ctrlGigs.gigsDeleteOne);

router
    .route('/gigsongs')                       
    .get(ctrlUsers.authenticate, ctrlGigsongs.gigsongsGetAll)   
    .post(ctrlGigsongs.gigsongsAddOne);                         //addGigSongs

router
    .route('/gigsongs/:gigsongId')             
    .get(ctrlGigsongs.gigsongsGetOne)                           //gigSongsDisplay                        
    .put(ctrlGigsongs.gigsongsUpdateOne)                        //updateGigSongs     
    .delete(ctrlGigsongs.gigsongsDeleteOne);    

router
    .route('/users/register')
    .post(ctrlUsers.register);

router
    .route('/users/login')
    .post(ctrlUsers.login);

router
    .route('/bandMembers')
    .get(ctrlUsers.authenticate, ctrlUsers.getBandMembers)
    .put(ctrlUsers.authenticate, ctrlUsers.updateVote);

router
    .route('/events')
    .get(ctrlUsers.authenticate, ctrlEvents.eventsGetAll)
    .post(ctrlUsers.authenticate, ctrlEvents.eventsAddOne);

router
    .route('/events/:eventId')
    .put(ctrlEvents.eventUpdate)
    .delete(ctrlEvents.eventsDeleteOne);

router
    .route('/eventsDeleteByDate/:date')
    .delete(ctrlUsers.authenticate, ctrlEvents.eventsDeleteByDate);

module.exports = router;