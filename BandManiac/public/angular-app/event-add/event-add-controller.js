angular.module('bandmaniac').controller('EventAddController', EventAddController);

function EventAddController($location, eventDataFactory) {
    var vm = this;
    vm.pageTitle = 'Add New Event';

    vm.addEvent = function(vm){
        eventDataFactory.addEvent(vm.event).then(function(response) {
            console.log(response);
            $location.path('/events');
        });
    }

    vm.goBack = function(){
        $location.path('/events');
    }
}