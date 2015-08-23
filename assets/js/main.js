var socket = io.connect();

//Global App name is ProRubric
angular.module('ProRubric', [])

//Required to remove the conviction between Handlebars and Angular.
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    })

    .service('Degree', function(){

        this.find = function(){
            socket.on('find degrees', function(allDegrees){
                console.log(allDegrees);
                socket.emit('view degree', allDegrees);
            })
        };
        this.save = function(degreeSave){
            socket.emit('add degree', degreeSave);
        };
        this.remove = function(){
            socket.emit('remove degree', degreeRemove);
        };

    })

    .controller('mainController', function($scope, Degree) {


        Degree.find();

        socket.on('view degree', function(allDegrees) {
            console.log(allDegrees);

            $scope.degreeData = allDegrees;
        });


            $scope.degreeAdd = function(){
            var degreeSave = {
                title: $scope.degreeTitle,
                acronym: $scope.degreeAcronym
            };
            Degree.save(degreeSave);
        };

        $scope.degreeRemove = function(){

            var degreeDelete = {
                _id : $scope._id,
                title: $scope.degreeTitle,
                acronym: $scope.degreeAcronym
            };
            Degree.remove(degreeDelete);
        };


    });

