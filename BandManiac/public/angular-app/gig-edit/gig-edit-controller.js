angular.module('bandmaniac').controller('GigEditController', GigEditController);

function GigEditController($scope, $location, $routeParams, gigDataFactory) {
    var vm = this;
    var id = $routeParams.id;
    gigDataFactory.gigDisplay(id).then(function(response){
       vm.gig = response.data;
    });
    
    vm.updateGig = function(vm){
        gigDataFactory.updateGig(vm.gig).then(function(response) {
            console.log(response);
            $location.path('/gigs');
        });
    }

    vm.editSongList = function(vm){
       $location.path('/gigSongs/edit/' + vm.gig.gigListId + '/' + vm.gig.bandId);
    }
    
    vm.goBack = function(){
        $location.path('/gigs');
    }

}