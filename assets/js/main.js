var socket = io.connect('');


//Global App name is ProRubric
angular.module('ProRubric', [])

//Required to remove the conviction between Handlebars and Angular.
.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
})

.controller('mainController', function($http,$scope) {

    $scope.rubric = function(rubricName){

        console.log(rubricName);

        socket.on('rubric', function (data) {
            console.log(data);
            socket.emit('my other event', { my: rubricName });
        });


    };


});