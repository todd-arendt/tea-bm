angular.module('bandmaniac').controller('SongDeleteController', SongDeleteController);

function SongDeleteController($location, $routeParams, songDataFactory) {
    var vm = this;
    var id = $routeParams.id;
    vm.pageTitle = 'Delete Song';
    
    songDataFactory.deleteSong(id).then(function(response) {
        console.log(response);
        console.log("deleted");
        $location.path('/songs');
    });
    


}