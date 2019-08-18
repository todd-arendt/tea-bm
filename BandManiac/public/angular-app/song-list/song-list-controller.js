angular.module('bandmaniac').controller('SongsController', SongsController);

function SongsController(songDataFactory, $route, $window, jwtHelper) {
    var vm = this;
    vm.pageTitle = 'BandMANIAC App';
    var paramValue = $route.current.$$route.songType;

    var token = jwtHelper.decodeToken($window.sessionStorage.token);
    var username = token.username;
    vm.bandid = token.bandid;


    //This is list of all ACTIVE songs, available to be used in a gig
    vm.refreshActiveList = function() {
        songDataFactory.songListActive().then(function(response) {
         vm.songs = response.data;
         });
    }
    
    vm.refreshInactiveList = function() {
        songDataFactory.songListInactive().then(function(response) {
        vm.songs = response.data;
        });
    }

    if (paramValue === "active") {
        vm.refreshActiveList();
    } else {
        vm.refreshInactiveList();
    }
    
}