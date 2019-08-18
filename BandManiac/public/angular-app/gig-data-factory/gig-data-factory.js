angular.module('bandmaniac').factory("gigDataFactory", gigDataFactory);

function gigDataFactory($http) {
    return {
        gigList : gigList,
        gigDisplay : gigDisplay,
        playGigDisplay : playGigDisplay,
        addGig : addGig,
        deleteGig : deleteGig,
        updateGig : updateGig
    };

    function gigList() {
        return $http.get('/api/gigs').then(complete).catch(failed);
    }

    function gigDisplay(id) {
        return $http.get('/api/gigs/' + id).then(complete).catch(failed);
    }

    function playGigDisplay(id) {
        return $http.get('/api/playGigDisplay/' + id).then(complete).catch(failed);
    }

    function addGig(vm) {
        return $http.post('/api/gigs', vm).then(complete).catch(failed);
    }

    function updateGig(vm) {
        return $http.put('/api/gigs/' + vm._id, vm).then(complete).catch(failed);
    }

    function deleteGig(id) {
        return $http.delete('/api/gigs/' + id).then(complete).catch(failed);
    }

    function complete(response) {
        return response;
    }

    function failed(error) {
        console.log(error.statusText);
    }

}