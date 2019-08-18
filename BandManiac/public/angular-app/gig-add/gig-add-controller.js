angular.module('bandmaniac').controller('GigAddController', GigAddController);

function GigAddController($scope, $location, gigDataFactory, eventDataFactory) {
    var vm = this;
    vm.pageTitle = 'Add New Gig';

    // vm.addGig = function(vm){
    //     gigDataFactory.addGig(vm.gig).then(function(response) {
    //         console.log(response);
    //         $location.path('/gigs');
    //     });
    // }

    vm.addGig = function(vm){
        gigDataFactory.addGig(vm.gig)
            .then(response => {
                vm.event = {};
                vm.event.eventDate = vm.gig.date;
                vm.event.eventType = 'gig';
                vm.event.eventDesc1 = vm.gig.venue;
                vm.event.eventDesc2 = vm.gig.fee;
                eventDataFactory.addEvent(vm.event);
            }).then(response2 => {
                console.log(response2);
                $location.path('/gigs');
        });
    }

    $scope.$watch(
        "vm.gig.date",
        function ( newValue, oldValue ) {
            if (newValue && newValue !== oldValue){
                vm.gig.gigListId = newValue + "001";
            }
        }
    );

    vm.goBack = function(){
        $location.path('/gigs');
    }
}