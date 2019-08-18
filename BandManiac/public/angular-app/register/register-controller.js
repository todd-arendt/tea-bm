angular.module('bandmaniac').controller('RegisterController', RegisterController);

function RegisterController($http){
    var vm=this;

    vm.register = function() {
        var user = {
            username: vm.username,
            password: vm.password,
            bandid: vm.bandid
        };

        if (!vm.username || !vm.password) {
            vm.error = 'Please add a username and a password.'
        } else {
            if (vm.password !== vm.passwordRepeat) {
                vm.error = 'Please make sure the passwords match.';
            } else {
                $http.post('/api/users/register', user).then(function(result) {
                    console.log(result);
                    vm.message = 'Succesful registration !';
                    vm.error = '';
                }).catch(function(error) {
                    console.log(error.data);
                    alert(error.data);
                });
            }
        }

    }
};