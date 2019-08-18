angular.module('bandmaniac').controller('GigSongsEditController', GigSongsEditController);

function GigSongsEditController($location, $routeParams, gigSongsDataFactory, songDataFactory, gigDataFactory) {
    var id = $routeParams.id;
    var bandId = $routeParams.bandId;
    var vm = this;
    // vm.showCopy = false;
    var isExistingSongList = false;
    vm.setBeingEdited = 1;
    vm.displayGigsongArray = [];
    var displayGigsong = {};
    vm.greenAddButtons = false;
    
    //This is list of all ACTIVE songs, available to be used in a gig
    vm.refreshList = function() {
        songDataFactory.songListActive().then(function(response) {
         vm.songs = response.data;
         });
    }
 
    vm.refreshList();

    vm.refreshGigList = function() {
        gigDataFactory.gigList().then(function(response) {
       // console.log(response);
        vm.gigs = response.data;
        const index = vm.gigs.indexOf(id);
        vm.gigs.splice(index,1);
        });
    }

    vm.refreshGigList();

    vm.refreshGigsongList = function() {
        gigSongsDataFactory.gigSongsDisplay(id).then(function(response){
            if(response && response.data && response.data.gigsong){
                // This response contains all 4 sets of songs (songsArray1, songsArray2, songsArray3, songsArray4)
                // BUT ONLY ONE set of songs is ever edited although ALL SETS are saved to back end at one time
                isExistingSongList = true;
                vm.gigsong = response.data.gigsong;

                switch (vm.setBeingEdited) {
                case 1:
                    console.log('setBeing edited is Set 1');
                    if ((vm.gigsong.songsArray1) && (vm.gigsong.songsArray1.length >= 0)) {
                        vm.displayGigsongArray.length = 0;          //displayGigsongArray is just a UI working copy of the setBeingEdited
                        vm.gigsong.songsArray1.forEach(function(gigsong) {
                            if(gigsong.set === vm.setBeingEdited)
                                songDataFactory.songDisplay(gigsong.songId).then(function(response){
                                    displayGigsong = response.data;
                                    displayGigsong.index = gigsong.songIndex;
                                    vm.displayGigsongArray.push(displayGigsong); 
                                    console.log(displayGigsong.title + " set " + gigsong.set + " songIndex: " + gigsong.songIndex);
                                    if(vm.displayGigsongArray.length === vm.gigsong.songsArray1.length){
                                        vm.displayGigsongArray.sort((a, b) => (a.index > b.index) ? 1 : -1);
                                        console.log("done with re-sort1");
                                    }                         
                            }); 
                        });
                    }
                    break;
                case 2:
                    console.log('setBeing edited is Set 2');
                    if ((vm.gigsong.songsArray2) && (vm.gigsong.songsArray2.length >= 0)) {
                        vm.displayGigsongArray.length = 0;          //displayGigsongArray is just a UI working copy of the setBeingEdited
                        vm.gigsong.songsArray2.forEach(function(gigsong) {
                            if(gigsong.set === vm.setBeingEdited)
                                songDataFactory.songDisplay(gigsong.songId).then(function(response){
                                    displayGigsong = response.data;
                                    displayGigsong.index = gigsong.songIndex;
                                    vm.displayGigsongArray.push(displayGigsong); 
                                    console.log(displayGigsong.title + " set " + gigsong.set + " songIndex: " + gigsong.songIndex);
                                    if(vm.displayGigsongArray.length === vm.gigsong.songsArray2.length){
                                        vm.displayGigsongArray.sort((a, b) => (a.index > b.index) ? 1 : -1);
                                        console.log("done with re-sort2");
                                    }   
                            }); 
                        });
                    }
                    break;
                case 3:
                    console.log('setBeing edited is Set 3');
                    if ((vm.gigsong.songsArray3) && (vm.gigsong.songsArray3.length >= 0)) {
                        vm.displayGigsongArray.length = 0;          //displayGigsongArray is just a UI working copy of the setBeingEdited
                        vm.gigsong.songsArray3.forEach(function(gigsong) {
                            if(gigsong.set === vm.setBeingEdited)
                                songDataFactory.songDisplay(gigsong.songId).then(function(response){
                                    displayGigsong = response.data;
                                    displayGigsong.index = gigsong.songIndex;
                                    vm.displayGigsongArray.push(displayGigsong); 
                                    console.log(displayGigsong.title + " set " + gigsong.set + " songIndex: " + gigsong.songIndex);
                                    if(vm.displayGigsongArray.length === vm.gigsong.songsArray3.length){
                                        vm.displayGigsongArray.sort((a, b) => (a.index > b.index) ? 1 : -1);
                                        console.log("done with re-sort3");
                                    }   
                            }); 
                        });
                    }
                    break;
                case 4:
                    console.log('setBeing edited is Set 4');
                    if ((vm.gigsong.songsArray4) && (vm.gigsong.songsArray4.length >= 0)) {
                        vm.displayGigsongArray.length = 0;          //displayGigsongArray is just a UI working copy of the setBeingEdited
                        vm.gigsong.songsArray4.forEach(function(gigsong) {
                            if(gigsong.set === vm.setBeingEdited)
                                songDataFactory.songDisplay(gigsong.songId).then(function(response){
                                    displayGigsong = response.data;
                                    displayGigsong.index = gigsong.songIndex;
                                    vm.displayGigsongArray.push(displayGigsong); 
                                    console.log(displayGigsong.title + " set " + gigsong.set + " songIndex: " + gigsong.songIndex);
                                    if(vm.displayGigsongArray.length === vm.gigsong.songsArray4.length){
                                        vm.displayGigsongArray.sort((a, b) => (a.index > b.index) ? 1 : -1);
                                        console.log("done with re-sort4");
                                    }   
                            }); 
                        });
                    }
                    break;
                default:
                    console.log('Sorry, setBeing edited is : ' + vm.setBeingEdited);
                }

            } else {
                isExistingSongList = false;
                // vm.showCopy = true;
                vm.gigsong = {};
                vm.gigsong.gigListId = id;
                vm.gigsong.bandId = bandId;
            }
        });
    };

    vm.refreshGigsongList();

    vm.selectSong = function(passedSongId) {
        vm.songToAddId = passedSongId;
        vm.greenAddButtons = true;    
    }

    vm.addToEnd = function(){

        switch (vm.setBeingEdited) {
            case 1:
                console.log('addToEnd Set 1');
                if(!vm.gigsong.songsArray1){
                    vm.gigsong.songsArray1 = [];
                }
                vm.gigsong.songsArray1.push({"songId": vm.songToAddId, "set": vm.setBeingEdited, "songIndex": 0});
                break;
            case 2:
                console.log('addToEnd Set 2');
                if(!vm.gigsong.songsArray2){
                    vm.gigsong.songsArray2 = [];
                }
                vm.gigsong.songsArray2.push({"songId": vm.songToAddId, "set": vm.setBeingEdited, "songIndex": 0});
                break;
            case 3:
                console.log('addToEnd Set 3');
                if(!vm.gigsong.songsArray3){
                    vm.gigsong.songsArray3 = [];
                }
                vm.gigsong.songsArray3.push({"songId": vm.songToAddId, "set": vm.setBeingEdited, "songIndex": 0});
                break;
            case 4:
                console.log('addToEnd Set 4');
                if(!vm.gigsong.songsArray4){
                    vm.gigsong.songsArray4 = [];
                }
                vm.gigsong.songsArray4.push({"songId": vm.songToAddId, "set": vm.setBeingEdited, "songIndex": 0});
                break;
            default:
                console.log('Sorry, addToEnd set is : ' + vm.setBeingEdited);
            }


        vm.updateGigSongs(vm);
    }

    //This method inserts a new song BEFORE the song selected in the songsArray, add bumps each subsequent songs' songIndex by 1
    vm.addBefore = function(songId){
        switch (vm.setBeingEdited) {
            case 1:
                console.log('addBefore Set 1');
                let editingSetSongs1 = vm.gigsong.songsArray1;
                let insertIndex1 = editingSetSongs1.map(s => s.songId).indexOf(songId);
                let affectedSongs1 = vm.gigsong.songsArray1.filter(s => s.songIndex >= insertIndex1);
                vm.gigsong.songsArray1.push({"songId": vm.songToAddId, "set": vm.setBeingEdited, "songIndex": insertIndex1});

                affectedSongs1.forEach(function(affsong) {
                    vm.gigsong.songsArray1.splice(vm.gigsong.songsArray1.map(s => s.songId).indexOf(affsong.songId), 1);
                    affsong.songIndex++;
                    vm.gigsong.songsArray1.push({"songId": affsong.songId, "set": affsong.set, "songIndex": affsong.songIndex});
                });
                break;
            case 2:
                console.log('addBefore Set 2');
                let editingSetSongs2 = vm.gigsong.songsArray2;
                let insertIndex2 = editingSetSongs2.map(s => s.songId).indexOf(songId);
                let affectedSongs2 = vm.gigsong.songsArray2.filter(s => s.songIndex >= insertIndex2);
                vm.gigsong.songsArray2.push({"songId": vm.songToAddId, "set": vm.setBeingEdited, "songIndex": insertIndex2});

                affectedSongs2.forEach(function(affsong) {
                    vm.gigsong.songsArray2.splice(vm.gigsong.songsArray2.map(s => s.songId).indexOf(affsong.songId), 1);
                    affsong.songIndex++;
                    vm.gigsong.songsArray2.push({"songId": affsong.songId, "set": affsong.set, "songIndex": affsong.songIndex});
                });
                break;
            case 3:
                console.log('addBefore Set 3');
                let editingSetSongs3 = vm.gigsong.songsArray3;
                let insertIndex3 = editingSetSongs3.map(s => s.songId).indexOf(songId);
                let affectedSongs3 = vm.gigsong.songsArray3.filter(s => s.songIndex >= insertIndex3);
                vm.gigsong.songsArray3.push({"songId": vm.songToAddId, "set": vm.setBeingEdited, "songIndex": insertIndex3});

                affectedSongs3.forEach(function(affsong) {
                    vm.gigsong.songsArray3.splice(vm.gigsong.songsArray3.map(s => s.songId).indexOf(affsong.songId), 1);
                    affsong.songIndex++;
                    vm.gigsong.songsArray3.push({"songId": affsong.songId, "set": affsong.set, "songIndex": affsong.songIndex});
                });
                break;
            case 4:
                console.log('addBefore Set 4');
                let editingSetSongs4 = vm.gigsong.songsArray4;
                let insertIndex4 = editingSetSongs4.map(s => s.songId).indexOf(songId);
                let affectedSongs4 = vm.gigsong.songsArray4.filter(s => s.songIndex >= insertIndex4);
                vm.gigsong.songsArray4.push({"songId": vm.songToAddId, "set": vm.setBeingEdited, "songIndex": insertIndex4});

                affectedSongs4.forEach(function(affsong) {
                    vm.gigsong.songsArray4.splice(vm.gigsong.songsArray4.map(s => s.songId).indexOf(affsong.songId), 1);
                    affsong.songIndex++;
                    vm.gigsong.songsArray4.push({"songId": affsong.songId, "set": affsong.set, "songIndex": affsong.songIndex});
                });
                break;
            default:
                console.log('Sorry, addBefore set is : ' + vm.setBeingEdited);
            }
    

        vm.updateGigSongs(vm);
    }

     //This method inserts a new song BEFORE the song selected in the songsArray, add bumps each subsequent songs' songIndex by 1
     vm.addAfter = function(songId){
        switch (vm.setBeingEdited) {
            case 1:
                console.log('addAfter Set 1');
                let editingSetSongs1 = vm.gigsong.songsArray1;
                let insertIndex1 = editingSetSongs1.map(s => s.songId).indexOf(songId);
                let affectedSongs1 = vm.gigsong.songsArray1.filter(s => s.songIndex > insertIndex1);
                vm.gigsong.songsArray1.push({"songId": vm.songToAddId, "set": vm.setBeingEdited, "songIndex": insertIndex1 + 1});

                affectedSongs1.forEach(function(affsong) {
                    vm.gigsong.songsArray1.splice(vm.gigsong.songsArray1.map(s => s.songId).indexOf(affsong.songId), 1);
                    affsong.songIndex++;
                    vm.gigsong.songsArray1.push({"songId": affsong.songId, "set": affsong.set, "songIndex": affsong.songIndex});
                });
                break;
            case 2:
                console.log('addAfter Set 2');
                let editingSetSongs2 = vm.gigsong.songsArray2;
                let insertIndex2 = editingSetSongs2.map(s => s.songId).indexOf(songId);
                let affectedSongs2 = vm.gigsong.songsArray2.filter(s => s.songIndex > insertIndex2);
                vm.gigsong.songsArray2.push({"songId": vm.songToAddId, "set": vm.setBeingEdited, "songIndex": insertIndex2 + 1});

                affectedSongs2.forEach(function(affsong) {
                    vm.gigsong.songsArray2.splice(vm.gigsong.songsArray2.map(s => s.songId).indexOf(affsong.songId), 1);
                    affsong.songIndex++;
                    vm.gigsong.songsArray2.push({"songId": affsong.songId, "set": affsong.set, "songIndex": affsong.songIndex});
                });
                break;
            case 3:
                console.log('addAfter Set 3');
                let editingSetSongs3 = vm.gigsong.songsArray3;
                let insertIndex3 = editingSetSongs3.map(s => s.songId).indexOf(songId);
                let affectedSongs3 = vm.gigsong.songsArray3.filter(s => s.songIndex > insertIndex3);
                vm.gigsong.songsArray3.push({"songId": vm.songToAddId, "set": vm.setBeingEdited, "songIndex": insertIndex3 + 1});

                affectedSongs3.forEach(function(affsong) {
                    vm.gigsong.songsArray3.splice(vm.gigsong.songsArray3.map(s => s.songId).indexOf(affsong.songId), 1);
                    affsong.songIndex++;
                    vm.gigsong.songsArray3.push({"songId": affsong.songId, "set": affsong.set, "songIndex": affsong.songIndex});
                });
                break;
            case 4:
                console.log('addAfter Set 4');
                let editingSetSongs4 = vm.gigsong.songsArray4;
                let insertIndex4 = editingSetSongs4.map(s => s.songId).indexOf(songId);
                let affectedSongs4 = vm.gigsong.songsArray4.filter(s => s.songIndex > insertIndex4);
                vm.gigsong.songsArray4.push({"songId": vm.songToAddId, "set": vm.setBeingEdited, "songIndex": insertIndex4 + 1});

                affectedSongs4.forEach(function(affsong) {
                    vm.gigsong.songsArray4.splice(vm.gigsong.songsArray4.map(s => s.songId).indexOf(affsong.songId), 1);
                    affsong.songIndex++;
                    vm.gigsong.songsArray4.push({"songId": affsong.songId, "set": affsong.set, "songIndex": affsong.songIndex});
                });
                break;
            default:
                console.log('Sorry, addAfter set is : ' + vm.setBeingEdited);
            }

        vm.updateGigSongs(vm);
    }

    vm.deleteFromSongsArray = function(songId) {
        switch (vm.setBeingEdited) {
            case 1:
                console.log('deleteFromSongsArray Set 1');
                let editingSetSongs1 = vm.gigsong.songsArray1;
                let deleteIndex1 = editingSetSongs1.map(s => s.songId).indexOf(songId);
                let affectedSongs1 = vm.gigsong.songsArray1.filter(s => s.songIndex > deleteIndex1);
                vm.gigsong.songsArray1.splice(deleteIndex1,1);

                affectedSongs1.forEach(function(affsong) {
                    vm.gigsong.songsArray1.splice(vm.gigsong.songsArray1.map(s => s.songId).indexOf(affsong.songId), 1);
                    affsong.songIndex--;
                    vm.gigsong.songsArray1.push({"songId": affsong.songId, "set": affsong.set, "songIndex": affsong.songIndex});
                });
                break;
            case 2:
                console.log('deleteFromSongsArray Set 2');
                let editingSetSongs2 = vm.gigsong.songsArray2;
                let deleteIndex2 = editingSetSongs2.map(s => s.songId).indexOf(songId);
                let affectedSongs2 = vm.gigsong.songsArray2.filter(s => s.songIndex > deleteIndex2);
                vm.gigsong.songsArray2.splice(deleteIndex2,1);

                affectedSongs2.forEach(function(affsong) {
                    vm.gigsong.songsArray2.splice(vm.gigsong.songsArray2.map(s => s.songId).indexOf(affsong.songId), 1);
                    affsong.songIndex--;
                    vm.gigsong.songsArray2.push({"songId": affsong.songId, "set": affsong.set, "songIndex": affsong.songIndex});
                });
                break;
            case 3:
                console.log('deleteFromSongsArray Set 3');
                let editingSetSongs3 = vm.gigsong.songsArray3;
                let deleteIndex3 = editingSetSongs3.map(s => s.songId).indexOf(songId);
                let affectedSongs3 = vm.gigsong.songsArray3.filter(s => s.songIndex > deleteIndex3);
                vm.gigsong.songsArray3.splice(deleteIndex3,1);

                affectedSongs3.forEach(function(affsong) {
                    vm.gigsong.songsArray3.splice(vm.gigsong.songsArray3.map(s => s.songId).indexOf(affsong.songId), 1);
                    affsong.songIndex--;
                    vm.gigsong.songsArray3.push({"songId": affsong.songId, "set": affsong.set, "songIndex": affsong.songIndex});
                });
                break;
            case 4:
                console.log('deleteFromSongsArray Set 4');
                let editingSetSongs4 = vm.gigsong.songsArray4;
                let deleteIndex4 = editingSetSongs4.map(s => s.songId).indexOf(songId);
                let affectedSongs4 = vm.gigsong.songsArray4.filter(s => s.songIndex > deleteIndex4);
                vm.gigsong.songsArray4.splice(deleteIndex4,1);

                affectedSongs4.forEach(function(affsong) {
                    vm.gigsong.songsArray4.splice(vm.gigsong.songsArray4.map(s => s.songId).indexOf(affsong.songId), 1);
                    affsong.songIndex--;
                    vm.gigsong.songsArray4.push({"songId": affsong.songId, "set": affsong.set, "songIndex": affsong.songIndex});
                });
                break;
            default:
                console.log('Sorry, deleteFromSongsArray set is : ' + vm.setBeingEdited);
            }

        vm.updateGigSongs(vm);
        
    }
    
    vm.editSet = function(vm,setNumber){
        vm.setBeingEdited = setNumber;
        vm.updateGigSongs(vm);
    }


    vm.save = function(vm){
        vm.updateGigSongs(vm);
        $location.path('/gigs');
    }

    vm.updateGigSongs = function(vm){
        vm.gigsong.gigListId = id;
        if (!isExistingSongList){
            gigSongsDataFactory.addGigSongs(vm.gigsong).then(function(response) {     // post call
            console.log(response);
            vm.refreshGigsongList(); //try
            });
        } else {
            gigSongsDataFactory.updateGigSongs(vm.gigsong).then(function(response) {   //put call
            console.log(response);
            vm.refreshGigsongList(); //try
            });
        }       
        //vm.refreshGigsongList();
    }

    vm.goBack = function(){
        $location.path('/gigs');
    }

    vm.copyGigList = function(listId){
        console.log("the list ID is: " + listId);
        gigSongsDataFactory.gigSongsDisplay(listId).then(function(response){
            if(response && response.data && response.data.gigsong){
                // This response contains all 4 sets of songs (songsArray1, songsArray2, songsArray3, songsArray4)
                // BUT ONLY ONE set of songs is ever edited although ALL SETS are saved to back end at one time
                isExistingSongList = true;
                vm.gigsong = response.data.gigsong;
                vm.gigsong.gigListId = id;
                console.log(vm.gigsong.gigListId); //try
                
                gigSongsDataFactory.addGigSongs(vm.gigsong).then(function(response) {     // post call
                    console.log(response);
                    vm.refreshGigsongList();
                    // vm.showCopy = false;
                });
            } else {
                isExistingSongList = false;
                vm.gigsong = {};
                vm.gigsong.gigListId = id;
                vm.gigsong.bandId = bandId;
                console.log(vm.gigsong.gigListId); //try
                
                gigSongsDataFactory.addGigSongs(vm.gigsong).then(function(response) {     // post call
                    console.log(response);
                    vm.refreshGigsongList(); //try
                });
            }
            // console.log(vm.gigsong.gigListId);
            // vm.updateGigSongs(vm);
        // copy the data of listID to a variable
        // deep copy songs from that variable to vm.gigsong
        // call vm.updateGigSongs(vm)
        });
    }
}