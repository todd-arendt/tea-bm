angular.module('bandmaniac').controller('SongEditController', SongEditController);

function SongEditController($location, $routeParams, $window, jwtHelper, songDataFactory) {
    var vm = this;

    var token = jwtHelper.decodeToken($window.sessionStorage.token);
    vm.votenumber = token.votenumber;

    var id = $routeParams.id;
    songDataFactory.songDisplay(id).then(function(response){
       vm.song = response.data;
    });
    
    vm.updateSong = function(vm){
        songDataFactory.updateSong(vm.song).then(function(response) {
            console.log(response);
            if ((vm.song.active === undefined) || (vm.song.active === undefined)) {
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
        if (vm.song.active === true){
            $location.path('/songsActive');
        } else {
            $location.path('/songsInactive');
        }
    }
}