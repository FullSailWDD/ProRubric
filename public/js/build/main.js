var socket = io.connect();

//Global App name is ProRubric
angular.module('ProRubric', [])

//Required to remove the conviction between Handlebars and Angular.
.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
})

.controller('mainController', function($scope) {

        $scope.rubric = function(){
            socket.emit('add rubric', { title: $scope.rubricTitle, acronym: $scope.degreeAcronym });
            socket.on('rubric', function (data) {
                console.log(data.title, data.acronym);
            });
        };

});
