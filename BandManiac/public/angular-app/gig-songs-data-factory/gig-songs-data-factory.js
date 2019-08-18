angular.module('bandmaniac').factory("gigSongsDataFactory", gigSongsDataFactory);

function gigSongsDataFactory($http) {
    return {
        gigSongsList : gigSongsList,
        gigSongsDisplay : gigSongsDisplay,
        addGigSongs : addGigSongs,
        deleteGigSongs : deleteGigSongs,
        updateGigSongs : updateGigSongs
    };

    function gigSongsList() {
        return $http.get('/api/gigsongs').then(complete).catch(failed);
    }

    function gigSongsDisplay(id) {
        return $http.get('/api/gigsongs/' + id).then(complete).catch(failed);
    }

    function addGigSongs(vm) {
        return $http.post('/api/gigsongs/', vm).then(complete).catch(failed);
    }

    function updateGigSongs(vm) {
        console.log("in updateGigSongs of gig-songs-data-factory");
        return $http.put('/api/gigsongs/' + vm.gigListId, vm).then(complete).catch(failed);
    }

    function deleteGigSongs(id) {
        return $http.delete('/api/gigsongs/' + id).then(complete).catch(failed);
    }

    function complete(response) {
        console.log("gig-songs-data-factory COMPLETE");
        return response;
    }

    function failed(error) {
        console.log("gig-songs-data-factory FAILED");
        console.log(error.statusText);
    }

}