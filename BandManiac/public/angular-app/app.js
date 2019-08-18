angular.module('bandmaniac',['ngRoute', 'angular-jwt']).config(config).run(run);
function config($httpProvider, $routeProvider){
    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/main/main.html',
            access: {
                restricted: false
            }
        })
        .when('/gigs/addNewGig', {
            templateUrl: 'angular-app/gig-add/gig-add.html',
            controller: GigAddController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/gigs/delete/:id', {
            templateUrl: 'angular-app/gig-delete/gig-delete.html',
            controller: GigDeleteController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/gigs/edit/:id', {
            templateUrl: 'angular-app/gig-edit/gig-edit.html',
            controller: GigEditController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/gigs', {
            templateUrl: 'angular-app/gigs/gigs.html',
            controller: GigsController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/gigSongs/edit/:id/:bandId', {
            templateUrl: 'angular-app/gig-songs-edit/gig-songs-edit.html',
            controller: GigSongsEditController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/band', {
            templateUrl: 'angular-app/band/band.html',
            access: {
                restricted: false
            }
        })
        .when('/play/:id', {
            templateUrl: 'angular-app/play/play.html',
            controller: PlayController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/playSelect', {
            templateUrl: 'angular-app/play-select/play-select.html',
            controller: PlaySelectController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/songs/addNewSong/:bandid', {
            templateUrl: 'angular-app/song-add/song-add.html',
            controller: SongAddController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/songs/delete/:id', {
            templateUrl: 'angular-app/song-delete/song-delete.html',
            controller: SongDeleteController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/songs/edit/:id', {
            templateUrl: 'angular-app/song-edit/song-edit.html',
            controller: SongEditController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/songs', {
            templateUrl: 'angular-app/song-list/songs.html',
            controller: SongsController,
            controllerAs: 'vm',
            songType: 'active',
            access: {
                restricted: false
            }
        })
        .when('/songs/:id', {
            templateUrl: 'angular-app/song-display/song.html',
            controller: SongController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/songsActive', {
            templateUrl: 'angular-app/song-list/songs.html',
            controller: SongsController,
            controllerAs: 'vm',
            songType: 'active',
            access: {
                restricted: false
            }
        })
        .when('/songsInactive', {
            templateUrl: 'angular-app/song-list/songs.html',
            controller: SongsController,
            controllerAs: 'vm',
            songType: 'inactive',
            access: {
                restricted: false
            }
        })
        .when('/register', {
            templateUrl: 'angular-app/register/register.html',
            controller: RegisterController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/profile', {
            templateUrl: 'angular-app/profile/profile.html',
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .otherwise({
            redirectTo: '/'
        });
} 

function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/');
        }
    })
}