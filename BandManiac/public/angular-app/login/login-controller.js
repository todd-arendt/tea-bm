angular.module('bandmaniac').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper){
    var vm = this;
    vm.showMenu = false;

    vm.toggleMenu = () => {
        vm.showMenu = !vm.showMenu;
    }

    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };

    vm.login = function(){
        if (vm.username && vm.password) {
            var user = {
                username: vm.username,
                password: vm.password
            };

            $http.post('/api/users/login', user).then(function(response) {
                if (response.data.success) {
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodeToken(token);
                    vm.loggedInUser = decodedToken.username;
                    vm.bandId = decodedToken.bandId;
                    $location.path('/gigs');
                }
            }).catch(function(error) {
                console.log("This is the error: " + error);
                alert("BandManiac does not recognize the login information you have provided. Please check your information and try again.");
            })
        }

    }

    vm.logout = function() {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/');

    }

    vm.isActiveTab = function(url) {
        var currentPath = $location.path().split('/')[1];
        return (url === currentPath ? 'active' : '');
    }

}