angular.module('ProRubric', [])
.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
})
.controller('mainController', function($http,$scope) {

    $scope.rubric = function(rubricName){

        $http.get('/degProcess', {msg: rubricName}).
            then(function(response) {
            }, function(response) {
            });

    };


});