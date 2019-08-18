angular.module('bandmaniac').factory("eventDataFactory", eventDataFactory);

function eventDataFactory($http) {
    return {
        eventList : eventList,
        eventDisplay : eventDisplay,
        addEvent : addEvent,
        deleteEvent : deleteEvent,
        updateEvent : updateEvent,
        eventsDeleteByDate : eventsDeleteByDate
    };

    function eventList() {
        return $http.get('/api/events').then(complete).catch(failed);
    }

    function eventDisplay(id) {
        return $http.get('/api/events/' + id).then(complete).catch(failed);
    }

    function addEvent(vm) {
        return $http.post('/api/events', vm).then(complete).catch(failed);
    }

    function updateEvent(vm) {
        return $http.put('/api/events/' + vm._id, vm).then(complete).catch(failed);
    }

    function deleteEvent(id) {
        return $http.delete('/api/events/' + id).then(complete).catch(failed);
    }
    
    function eventsDeleteByDate(date) {
        return $http.delete('/api/eventsDeleteByDate/' + date).then(complete).catch(failed);
    }
    
    function complete(response) {
        return response;
    }

    function failed(error) {
        console.log(error.statusText);
    }

}