angular.module('ProRubric', [])

.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
})

.controller('mainController', function($http,$scope) {

    $scope.rubric = function(rubricName){

        $http.get('/degProcess'+rubricName, {msg: rubricName}).
            then(function(response) {
            }, function(response) {
            });

    };


});