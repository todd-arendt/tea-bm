angular.module('bandmaniac').controller('ProfileController', ProfileController);

function ProfileController($window, jwtHelper, userDataFactory) {
    var vm = this;
    vm.pageTitle = 'Bandmembers List';
    
    var token = jwtHelper.decodeToken($window.sessionStorage.token);
    vm.votenumber = token.votenumber;
    vm.username = token.username;
    vm.firstUserName = vm.username;
    vm.refreshList = function() {
        userDataFactory.bandMemberList().then(function(response) {
        vm.bandMembers = response.data;
        });
    }

    vm.refreshList();

    vm.updateVote = function(voteNum, targetUserName, votedValue){
        vm.voteNum = voteNum;
        vm.voteValue = votedValue;
        vm.targetUserName = targetUserName;
        userDataFactory.updateVote(vm).then(function(response) {
            console.log(response);
            $location.path('/profile');
        });
    }

    // NEED TO SET ACTIVE / PENDING / ETC. BASED UPON QUERYING VOTES HERE !


    //    The Profile screen page only shows how the user is voting, NOT how users have voted on him/her
    //    for example if the only adverse vote is Baxter (votenumber 2) voting to remove Rizzo (votenumber 1), 
    //    Baxter would see on his Profile page: 
    //              Rizzo:  False
    //              Baxter: True
    //              Gigi:   True
    //              Lucky:  True
    //              Lassie: True
    //
    //    Rizzo would see on his Profile page:
    //              Rizzo:  True
    //              Baxter: True
    //              Gigi:   True
    //              Lucky:  True
    //              Lassie: True
    //
    //    Rizzo's user db record (which Rizzo can't see) would have:
    //              bandstatusv1: True      (populated from Rizzo's voting since he is votenumber 1)
    //              bandstatusv2: False     (populated from Baxter's voting since he is votenumber 2)
    //              bandstatusv3: True
    //              bandstatusv4: True
    //              bandstatusv5: True
    //
   //    Baxter's user db record (which Baxter can't see) would have:
    //              bandstatusv1: True      (populated from Rizzo's voting since he is votenumber 1)
    //              bandstatusv2: True      (populated from Baxter's voting since he is votenumber 2)
    //              bandstatusv3: True
    //              bandstatusv4: True
    //              bandstatusv5: True
    //
    //  To determine overall bandstatus of a member (in this example, Rizzo), query that members bandstatusv1, v2, v3, v4, v5 fields(*)
    //  --> if voteValue === true && if ALL (*) are TRUE --> set member's overall bandstatus to active
    //  --> if voteValue === false && if ALL (minus 1) (*) are FALSE --> set member's overall bandstatus back to pending
    //
    //
    //
    //
    //
    //

    
}