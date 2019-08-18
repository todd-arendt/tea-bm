angular.module('bandmaniac').controller('PlaySelectController', PlaySelectController);

function PlaySelectController(gigDataFactory) {
    var vm = this;
    vm.pageTitle = 'BandMANIAC App';
    
    vm.refreshList = function() {
        gigDataFactory.gigList().then(function(response) {
       // console.log(response);
        vm.gigs = response.data;
        });
    }

    vm.refreshList();
    
}