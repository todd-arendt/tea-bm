angular.module('bandmaniac').controller('SongAddController', SongAddController);

function SongAddController($location, $routeParams, $window, jwtHelper, songDataFactory) {
    var vm = this;
    var token = jwtHelper.decodeToken($window.sessionStorage.token);
    vm.votenumber = token.votenumber;

    vm.bandid = $routeParams.bandid;
    vm.pageTitle = 'Add New Song';

    vm.addSong = function(vm){
        vm.song.bandId = vm.bandid;
        songDataFactory.addSong(vm.song).then(function(response) {
            if ((undefined === vm.song) || (vm.song.active && vm.song.active === false)) {
                vm.song.active = false;
            }
            if (vm.song.active === true){
                $location.path('/songsActive');
            } else {
                $location.path('/songsInactive');
            }
        });
    }

    vm.goBack = function(vm){
        if ((undefined === vm.song) || (vm.song.active && vm.song.active === false)) {
            $location.path('/songsInactive');
        } else {
            if (vm.song.active === true){
                $location.path('/songsActive'); 
            } 
        }
    }
}