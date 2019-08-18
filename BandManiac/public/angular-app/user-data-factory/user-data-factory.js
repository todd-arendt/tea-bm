angular.module('bandmaniac').factory("userDataFactory", userDataFactory);

function userDataFactory($http) {
    return {
        bandMemberList : bandMemberList,
        updateVote : updateVote
    };

    function bandMemberList() {
        return $http.get('/api/bandMembers').then(complete).catch(failed);
    }

    function updateVote(vm) {
        return $http.put('/api/bandMembers/', vm).then(complete).catch(failed);
        //need to pass user._id in url param and vm in request body
    }

    function complete(response) {
        return response;
    }

    function failed(error) {
        console.log(error.statusText);
    }

}