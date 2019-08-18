angular.module('bandmaniac').controller('GigsController', GigsController);

function GigsController(gigDataFactory) {
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