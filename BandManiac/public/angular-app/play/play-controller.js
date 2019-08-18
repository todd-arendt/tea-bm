angular.module('bandmaniac').controller('PlayController', PlayController);

function PlayController($location, $routeParams, gigSongsDataFactory, songDataFactory, gigDataFactory) {
    var id = $routeParams.id;   // this is the passed in gigListId
   // var bandId = $routeParams.bandId;
    var vm = this;
    vm.setBeingViewed = 1;
    vm.displayGigsongArray = [];
    var displayGigsong = {};
    var nextSetNumber = 1;
    vm.currentSong = {};
    vm.currentlyDisplayedSongIndex = 0;
    vm.currentlyDisplayedSongSet = 1;
    vm.greenAddButtons = false;

    gigDataFactory.playGigDisplay(id).then(function(response){
        vm.gig = response.data;
     });

    vm.refreshGigsongList = function() {
        gigSongsDataFactory.gigSongsDisplay(id).then(function(response){
            if(response && response.data && response.data.gigsong){
                // This response contains all 4 sets of songs (songsArray1, songsArray2, songsArray3, songsArray4)
                vm.gigsong = response.data.gigsong;

                switch (vm.setBeingViewed) {
                case 1:
                    console.log('setBeing viewed is Set 1');
                    if ((vm.gigsong.songsArray1) && (vm.gigsong.songsArray1.length >= 0)) {
                        vm.displayGigsongArray.length = 0;          //displayGigsongArray is just a UI working copy of the setBeingViewed
                        vm.gigsong.songsArray1.forEach(function(gigsong) {
                            if(gigsong.set === vm.setBeingViewed)
                                songDataFactory.songDisplay(gigsong.songId).then(function(response){
                                    displayGigsong = response.data;
                                    displayGigsong.index = gigsong.songIndex;
                                    vm.displayGigsongArray.push(displayGigsong); 
                                    console.log(displayGigsong.title + " set " + gigsong.set + " songIndex: " + gigsong.songIndex);
                                    if(vm.displayGigsongArray.length === vm.gigsong.songsArray1.length){
                                        vm.displayGigsongArray.sort((a, b) => (a.index > b.index) ? 1 : -1);
                                        console.log("done with re-sort1");
                                        vm.currentlyDisplayedSongSet = 1;
                                        vm.currentlyDisplayedSongIndex = 0;
                                        console.log("INITIAL SETTING OF CURRENTSONG 1--------------------");
                                        vm.currentSong = vm.displayGigsongArray[vm.currentlyDisplayedSongIndex];
                                    }                          
                            }); 
                        });

                    }
                    break;
                case 2:
                    console.log('setBeing viewed is Set 2');
                    if ((vm.gigsong.songsArray2) && (vm.gigsong.songsArray2.length >= 0)) {
                        vm.displayGigsongArray.length = 0;          //displayGigsongArray is just a UI working copy of the setBeingViewed
                        vm.gigsong.songsArray2.forEach(function(gigsong) {
                            if(gigsong.set === vm.setBeingViewed)
                                songDataFactory.songDisplay(gigsong.songId).then(function(response){
                                    displayGigsong = response.data;
                                    displayGigsong.index = gigsong.songIndex;
                                    vm.displayGigsongArray.push(displayGigsong); 
                                    console.log(displayGigsong.title + " set " + gigsong.set + " songIndex: " + gigsong.songIndex);
                                    if(vm.displayGigsongArray.length === vm.gigsong.songsArray2.length){
                                        vm.displayGigsongArray.sort((a, b) => (a.index > b.index) ? 1 : -1);
                                        console.log("done with re-sort2");
                                        vm.currentlyDisplayedSongSet = 2;
                                        vm.currentlyDisplayedSongIndex = 0;
                                        console.log("INITIAL SETTING OF CURRENTSONG 2--------------------");
                                        vm.currentSong = vm.displayGigsongArray[vm.currentlyDisplayedSongIndex];
                                    }            
                            
                            }); 
                        });
                    }
                    break;
                case 3:
                    console.log('setBeing viewed is Set 3');
                    if ((vm.gigsong.songsArray3) && (vm.gigsong.songsArray3.length >= 0)) {
                        vm.displayGigsongArray.length = 0;          //displayGigsongArray is just a UI working copy of the setBeingViewed
                        vm.gigsong.songsArray3.forEach(function(gigsong) {
                            if(gigsong.set === vm.setBeingViewed)
                                songDataFactory.songDisplay(gigsong.songId).then(function(response){
                                    displayGigsong = response.data;
                                    displayGigsong.index = gigsong.songIndex;
                                    vm.displayGigsongArray.push(displayGigsong); 
                                    console.log(displayGigsong.title + " set " + gigsong.set + " songIndex: " + gigsong.songIndex);
                                    if(vm.displayGigsongArray.length === vm.gigsong.songsArray3.length){
                                        vm.displayGigsongArray.sort((a, b) => (a.index > b.index) ? 1 : -1);
                                        console.log("done with re-sort3");
                                        vm.currentlyDisplayedSongSet = 3;
                                        vm.currentlyDisplayedSongIndex = 0;
                                        console.log("INITIAL SETTING OF CURRENTSONG 3--------------------");
                                        vm.currentSong = vm.displayGigsongArray[vm.currentlyDisplayedSongIndex];
                                    }            
                            }); 
                        });
                    }
                    break;
                case 4:
                    console.log('setBeing viewed is Set 4');
                    if ((vm.gigsong.songsArray4) && (vm.gigsong.songsArray4.length >= 0)) {
                        vm.displayGigsongArray.length = 0;          //displayGigsongArray is just a UI working copy of the setBeingViewed
                        vm.gigsong.songsArray4.forEach(function(gigsong) {
                            if(gigsong.set === vm.setBeingViewed)
                                songDataFactory.songDisplay(gigsong.songId).then(function(response){
                                    displayGigsong = response.data;
                                    displayGigsong.index = gigsong.songIndex;
                                    vm.displayGigsongArray.push(displayGigsong); 
                                    console.log(displayGigsong.title + " set " + gigsong.set + " songIndex: " + gigsong.songIndex);
                                    if(vm.displayGigsongArray.length === vm.gigsong.songsArray4.length){
                                        vm.displayGigsongArray.sort((a, b) => (a.index > b.index) ? 1 : -1);
                                        console.log("done with re-sort4");
                                        vm.currentlyDisplayedSongSet = 4;
                                        vm.currentlyDisplayedSongIndex = 0;
                                        console.log("INITIAL SETTING OF CURRENTSONG 4--------------------");
                                        vm.currentSong = vm.displayGigsongArray[vm.currentlyDisplayedSongIndex];
                                    }            
                            
                            }); 
                        });
                    }
                    break;
                default:
                    console.log('Sorry, setBeing viewed is : ' + vm.setBeingViewed);
                }

            } else {
                vm.gigsong = {};
                vm.gigsong.gigListId = id;
              //  vm.gigsong.bandId = bandId;
            }
        });
    };

    vm.refreshGigsongList();


    vm.editSet = function(vm,setNumber){
        vm.gigsong.gigListId = id;
        vm.setBeingViewed = setNumber;
        vm.refreshGigsongList();
    }

    vm.previousSong = function(){
        vm.currentlyDisplayedSongIndex--;
        if (vm.currentlyDisplayedSongIndex < 0) {
            vm.currentlyDisplayedSongIndex = 0;
            if (vm.currentlyDisplayedSongSet === 1) {
                nextSetNumber = 4;
            } else {
                nextSetNumber = vm.currentlyDisplayedSongSet - 1;;
            }
            vm.editSet(vm,nextSetNumber);
        } else {
            vm.currentSong = vm.displayGigsongArray[vm.currentlyDisplayedSongIndex];
            console.log("displaying song from set: " + vm.currentlyDisplayedSongSet + " songIndex: " + vm.currentlyDisplayedSongIndex);
        }    
    }

    vm.nextSong = function(){
        vm.currentlyDisplayedSongIndex++;
        if (vm.currentlyDisplayedSongIndex >= vm.displayGigsongArray.length) {
            vm.currentlyDisplayedSongIndex = 0;
            if (vm.currentlyDisplayedSongSet < 4) {
                nextSetNumber = vm.currentlyDisplayedSongSet + 1;
            } else {
                nextSetNumber = 1;
            }
            vm.editSet(vm,nextSetNumber);
        } else {
            vm.currentSong = vm.displayGigsongArray[vm.currentlyDisplayedSongIndex];
            console.log("displaying song from set: " + vm.currentlyDisplayedSongSet + " songIndex: " + vm.currentlyDisplayedSongIndex);
        }
    }

    vm.goBack = function(){
        $location.path('/playSelect');
    }
}