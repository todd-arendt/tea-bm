angular.module('bandmaniac').factory("songDataFactory", songDataFactory);

function songDataFactory($http) {
    return {
        songList : songList,
        songListActive: songListActive,
        songListInactive: songListInactive,
        songDisplay : songDisplay,
        songPlayDisplay : songPlayDisplay,
        addSong : addSong,
        deleteSong : deleteSong,
        updateSong : updateSong
    };

    function songList() {
        return $http.get('/api/songs').then(complete).catch(failed);
    }

    function songListActive() {
        return $http.get('/api/activesongs').then(complete).catch(failed);
    }

    function songListInactive() {
        return $http.get('/api/inactivesongs').then(complete).catch(failed);
    }

    function songDisplay(id) {
        return $http.get('/api/songs/' + id).then(complete).catch(failed);
    }

    function songPlayDisplay(vm) {
        return $http.get('/api/playdisplay/' + vm.currentlyDisplayedSongSet +'/' + vm.currentlyDisplayedSongIndex).then(complete).catch(failed);
    }

    function addSong(vm) {
        return $http.post('/api/songs', vm).then(complete).catch(failed);
    }

    function updateSong(vm) {
        return $http.put('/api/songs/' + vm._id, vm).then(complete).catch(failed);
    }

    function deleteSong(id) {
        return $http.delete('/api/songs/' + id).then(complete).catch(failed);
    }

    function complete(response) {
        return response;
    }

    function failed(error) {
        console.log(error.statusText + " <== is the error statusText from song-data-foactory");
    }

}