angular.module('bandmaniac').controller('GigDeleteController', GigDeleteController);

function GigDeleteController($location, $routeParams, gigDataFactory, eventDataFactory, gigSongsDataFactory) {
    var vm = this;
    var id = $routeParams.id;
    var deleteGigListId = null;
    var deleteGigEventDate = null;
    vm.pageTitle = 'Delete Gig';

    gigDataFactory.gigDisplay(id)
        .then(gig => {
            // delete using gig.data.gigListId
            console.log("the gig date is: " + gig.data.date);
            deleteGigEventDate = gig.data.date;
            console.log("the gigListId is: " + gig.data.gigListId);
            deleteGigListId = gig.data.gigListId;
            gigSongsDataFactory.deleteGigSongs(deleteGigListId);
        }).then(listResponse => {
            eventDataFactory.eventsDeleteByDate(deleteGigEventDate);
        }).then(response => {
            gigDataFactory.deleteGig(id)
        .then(function(response2) {
            console.log("deleted");
            $location.path('/gigs');
            });
        });

}

