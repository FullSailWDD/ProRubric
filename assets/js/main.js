//Global App name is ProRubric
angular.module('ProRubric', [])

//Required to remove the conviction between Handlebars and Angular.
.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

.controller('mainController', function($scope) {

    $scope.addDegree = function(degreeName, degreeAcronym){
        console.log('Degree Name: ', degreeName);
        console.log('Degree Acronym: ', degreeAcronym);
    };


});