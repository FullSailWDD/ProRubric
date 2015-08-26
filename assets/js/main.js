'use strict';
/* globals io,angular,$*/
var socket = io.connect();

angular.module('ProRubric', ['ngRoute'])
    .config(function ($interpolateProvider, $routeProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $routeProvider
            .when('/audit/:rubric_id', {
                templateUrl: 'views/audit.html',
                controller: 'AuditController'
            })
            .when('/addInfo', {
                templateUrl: 'views/addInfo.html',
                controller: 'secondController'
            })
            .when('/addForm', {
                templateUrl: 'views/addForm.html',
                controller: 'secondController'
            })
            .when('/addRubric', {
                templateUrl: 'views/addRubric.html',
                controller: 'secondController'
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'secondController'
            })
            .when('/info', {
                templateUrl: 'views/info.html',
                controller: 'secondController'
            })
            .when('/text', {
                templateUrl: 'views/text.html',
                controller: 'secondController'
            });
    })
    .service('Degree', function () {
        this.view = function () {
            socket.once('find degrees', function (data) {
                angular.forEach(data, function (key) {
                    $('.columns').append('<div class="pin"><p>' + key._id + ' ' + key.title + ' ' + key.acronym + '</p></div>');
                });
            });
        };
        this.save = function (degreeNew) {
            socket.emit('add degree', degreeNew);
        };
        this.remove = function () {
        };
    })

    .controller('mainController', function ($scope, Degree) {
        //Main Route Loading Point Start
        Degree.view();
        //Main Route Loading Point End

        $scope.degreeAdd = function () {
            var degreeNew = {
                title: $scope.degreeTitle,
                acronym: $scope.degreeAcronym
            };
            Degree.save(degreeNew);
        };


    })
    .controller('secondController', function () {


    })

    .service('Audit', [function() {
        this.data = {
                _id:        '1324567896543',
                title:      'Deployment Day II',
                content:    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero sem, volutpat eget massa et, mattis accumsan velit. Praesent fermentum a est vel pulvinar. Maecenas vestibulum rutrum erat, sit amet venenatis mi scelerisque non. Integer elementum laoreet velit eu convallis. ',
                gradeTiers: [100,75,40,0],
                auditMatrix:[],
                totalLineItems: 8,
                auditProgress: 0,
                course:     { _id : '9876345345', title: 'Deployment of Web Projects', acronym : 'DWP'},
                sections:   [
                                { 
                                    _id:            '44343433',
                                    title:          'Design',
                                    gradeWeight:    50,
                                    lineItems:      [
                                                        { _id : '22233232323', title : 'Branding', content: 'Project utilizes consistent and pleasing color palette and font choices. Accents and contrast are used to highlight important elements. All visual elements complement the selected branding and design aesthetic.' },
                                                        { _id : '22233232324', title : 'User Flow', content: 'Users should be able to intuitively navigate through the project. All areas are accessible and user actions are prompted with appropriate feedback.' },
                                                        { _id : '22233232325', title : 'User Experience', content: 'The project implements logical UI patterns and the cognitive load of the user is relatively light. A well designed mobile experienced is delivered to the user utilizing positive subtle messaging to draw the user further into the application.' },
                                                        { _id : '22233232326', title : 'Information Hierarchy', content: 'Attention is clearly and cleanly drawn to various elements depending on their well planned structured hierarchy of importance.' },
                                                    ]
                                },
                                { 
                                    _id:            '44343434',
                                    title:          'Code',
                                    gradeWeight:    50,
                                    lineItems:      [
                                                        { _id : '22233232327', title : 'Semantics', content: 'The study of meaning. In this situation we’re interested in the meaning of your code. Variables, functions, classes, objects, CSS Classes, HTML tags, etc. should all be named clearly, cleanly and semantically to represent the content they contain.' },
                                                        { _id : '22233232328', title : 'Comprehension', content: 'The ability for a 3rd party developer or peer reviewer to transverse your code easily. Unnecessarily complex code structures, code not in use or heavily commented out code are considered bad practices and will be penalized accordingly.' },
                                                        { _id : '22233232329', title : 'MVC File Structure', content: 'Proper file structure and organization for an MVC framework. Views, Models, and Controllers are handled properly.' },
                                                        { _id : '22233232320', title : 'Formatting, Comments, & Logs', content: 'All code should be formatted and commented professionally. Its highly recommended to adopt a consistent pattern and follow it, look into phpDocumentor for references. Additionally, labeled console.log()’s, when used, should be used appropriately and in moderation as to not bombard the reviewer / developer.' },
                                                    ]
                                }
                            ]

            };
    }])

    .controller('AuditController', ['$scope', 'Audit', function( $scope, Audit ){
        
        $scope.rubric       = Audit.data;
        $scope.calculateAuditProgress = function(lineItemID, grade){
            $scope.rubric.auditMatrix[lineItemID] = grade;
            var currentAudited = Object.keys($scope.rubric.auditMatrix).length;
            $scope.rubric.auditProgress = ((currentAudited / $scope.rubric.totalLineItems)*100);
            return $scope.rubric.auditProgress;
        }       
        $scope.actionGrade  = function (lineItemID, grade) {
            
            // Error handling for loop not finding supplied ID
            var matchedLineItem = false;

            // TODO clean up this double loop to find the target lineItem based on ID
            angular.forEach($scope.rubric.sections, function (section, sectionKey) {
                angular.forEach(section.lineItems, function (lineItem, lineItemKey) {
                    if(lineItem._id === lineItemID){
                        lineItem.grade = grade;
                        matchedLineItem = lineItem;
                    }
                });
            });
            if(!matchedLineItem){
                console.log('Error: No Item ID Matched for this Rubric');
            } else {
             //   console.log('Graded: ', matchedLineItem)
               $scope.calculateAuditProgress(lineItemID, grade);
            }
        };

        $scope.actionOutput = function(){
            console.log($scope.rubric);
        };

    }]);