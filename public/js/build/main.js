var socket = io.connect();

//Global App name is ProRubric
angular.module('ProRubric', [])

//Required to remove the conviction between Handlebars and Angular.
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    })
    .service('Degree', function () {
        this.view = function(){
            socket.once('find degrees', function (data) {
                angular.forEach(data, function (key) {
                    $('.columns').append('<div class="pin"><p>'+key._id+' '+key.title+' '+ key.acronym +'</p></div>');
                });
            });
        };
        this.save = function (degreeSave) {
            socket.emit('add degree', degreeSave);
        };
        this.remove = function () {
        };

    })
    .controller('mainController', function ($scope, Degree) {
        //Main Route Loading Point Start
        Degree.view();
        //Main Route Loading Point End

        $scope.degreeAdd = function () {
            var degreeSave = {
                title: $scope.degreeTitle,
                acronym: $scope.degreeAcronym
            };
            Degree.save(degreeSave);
        };



    });

