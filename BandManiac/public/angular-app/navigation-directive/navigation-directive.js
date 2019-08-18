angular.module('bandmaniac').directive('bmNavigation', bmNavigation);

function bmNavigation(){
    return {
        restrict: 'E',
        templateUrl: 'angular-app/navigation-directive/navigation-directive.html'
    };
}