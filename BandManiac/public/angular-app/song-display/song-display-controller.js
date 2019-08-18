angular.module('bandmaniac').controller('SongController', SongController);

function SongController( $route, $routeParams, $window, $location, jwtHelper, songDataFactory, AuthFactory) {
    var vm = this;
    var id = $routeParams.id;
    songDataFactory.songDisplay(id).then(function(response){
       vm.song = response.data;
       vm.stars = _getStarRating(response.data.stars);
    });

    function _getStarRating(stars) {
        return new Array(stars);
    }

    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };

    vm.goBack = function(){
        $location.path('/songs');
    }

    vm.addReview = function() {

        var token = jwtHelper.decodeToken($window.sessionStorage.token);
        var username = token.username;
        var postData = {
            name: username,
            rating: vm.rating,
            review: vm.review
        };
        if (vm.reviewForm.$valid){
            songDataFactory.postReview(id, postData).then(function(response) {
                if ((response.status === 200) || (response.status === 201)) {
                    $route.reload();
                }
            }).catch(function(error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted= true;
        }
    };
}