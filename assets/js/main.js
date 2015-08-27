'use strict';
angular.module('ProRubric', ['ngRoute'])
    .config(['$interpolateProvider', '$routeProvider', function ($interpolateProvider, $routeProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardController'
            })
            .when('/edit/degree/:degree_id', {
                templateUrl: 'views/editDegree.html',
                controller: 'editDegree'
            })
            .when('/edit/course/:course_id', {
                templateUrl: 'views/editCourse.html',
                controller: 'editCourse'
            })
            .when('/course', {
                templateUrl: 'views/courses.html',
                controller: 'coursesController'
            })
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
            })
    }])

    .service('Audit', [function () {
        // TODO Static Data currently. Feed this from the DB and create this data structure.
        this.data = {
            auditMatrix: [],     // Not from the Database
            totalLineItems: 8,  // Not from the Database
            auditProgress: 0,   // Not from the Database
            auditGrade: 0,      // Not from the Database
            _id: '1324567896543',
            title: 'Deployment Day II',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero sem, volutpat eget massa et, mattis accumsan velit. Praesent fermentum a est vel pulvinar. Maecenas vestibulum rutrum erat, sit amet venenatis mi scelerisque non. Integer elementum laoreet velit eu convallis. ',
            gradeTiers: [1, 0.75, 0.40, 0],
            course: {_id: '9876345345', title: 'Deployment of Web Projects', acronym: 'DWP'},
            sections: [
                {
                    _id: '44343433',
                    title: 'Design',
                    gradeWeight: 0.5,
                    lineItems: [
                        {
                            _id: '22233232323',
                            title: 'Branding',
                            content: 'Project utilizes consistent and pleasing color palette and font choices. Accents and contrast are used to highlight important elements. All visual elements complement the selected branding and design aesthetic.'
                        },
                        {
                            _id: '22233232324',
                            title: 'User Flow',
                            content: 'Users should be able to intuitively navigate through the project. All areas are accessible and user actions are prompted with appropriate feedback.'
                        },
                        {
                            _id: '22233232325',
                            title: 'User Experience',
                            content: 'The project implements logical UI patterns and the cognitive load of the user is relatively light. A well designed mobile experienced is delivered to the user utilizing positive subtle messaging to draw the user further into the application.'
                        },
                        {
                            _id: '22233232326',
                            title: 'Information Hierarchy',
                            content: 'Attention is clearly and cleanly drawn to various elements depending on their well planned structured hierarchy of importance.'
                        },
                    ]
                },
                {
                    _id: '44343434',
                    title: 'Code',
                    gradeWeight: 0.5,
                    lineItems: [
                        {
                            _id: '22233232327',
                            title: 'Semantics',
                            content: 'The study of meaning. In this situation we’re interested in the meaning of your code. Variables, functions, classes, objects, CSS Classes, HTML tags, etc. should all be named clearly, cleanly and semantically to represent the content they contain.'
                        },
                        {
                            _id: '22233232328',
                            title: 'Comprehension',
                            content: 'The ability for a 3rd party developer or peer reviewer to transverse your code easily. Unnecessarily complex code structures, code not in use or heavily commented out code are considered bad practices and will be penalized accordingly.'
                        },
                        {
                            _id: '22233232329',
                            title: 'MVC File Structure',
                            content: 'Proper file structure and organization for an MVC framework. Views, Models, and Controllers are handled properly.'
                        },
                        {
                            _id: '22233232320',
                            title: 'Formatting, Comments, & Logs',
                            content: 'All code should be formatted and commented professionally. Its highly recommended to adopt a consistent pattern and follow it, look into phpDocumentor for references. Additionally, labeled console.log()’s, when used, should be used appropriately and in moderation as to not bombard the reviewer / developer.'
                        },
                    ]
                }
            ]

        };
    }])


.factory('socket',  ['$rootScope', function ($rootScope) {
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }])

    .controller('dashboardController', ['$scope', 'socket', function ($scope, socket) {

        $scope.reloadPage = function () {
            window.location.reload();
        };
        $scope.$on('$viewContentLoaded', function () {
            socket.on('find degrees', function (data) {
                if (data.length) {
                    $scope.degreeView = data;
                } else {
                    console.log('You has no degrees :(');
                }
            });
            socket.on('find courses', function (data) {
                if (data.length) {
                    $scope.courseView = data;
                } else {
                    console.log('You has no courses :(');
                }
            });
        });

        $scope.degreeAdd = function () {
            var _data = {
                title: $scope.degreeTitle,
                acronym: $scope.degreeAcronym
            };
            socket.emit('add degree', _data);
            $scope.reloadPage();
        };

        $scope.degreeDelete = function (_data) {
            socket.emit('delete degree', _data);
            $scope.reloadPage();
        }

    }])

    .controller('coursesController', ['$scope', 'socket', function ($scope, socket) {

        $scope.reloadPage = function () {
            window.location.reload();
        };
        $scope.$on('$viewContentLoaded', function () {
            socket.on('find courses', function (data) {
                if (data.length) {
                    console.log(data);
                    $scope.courseView = data;
                } else {
                    console.log('You has no courses :(');
                }
            });
        });

        $scope.courseAdd = function () {
            var _data = {
                title: $scope.courseTitle,
                acronym: $scope.courseAcronym,
                description: $scope.courseDescription
            };
            socket.emit('add course', _data);
            $scope.reloadPage();
        };

        $scope.courseDelete = function (_data) {
            socket.emit('delete course', _data);
            $scope.reloadPage();
        }

    }])


    .controller('editDegree', ['$scope', '$routeParams', 'socket', function ($scope, $routeParams, socket) {
        $scope.reloadPage = function () {
            window.location.reload();
        };
        socket.emit('degree req', $routeParams.degree_id);

        socket.on('degree send', function (data) {
            $scope.degreeEdit = data[0];
        });

        $scope.degreeUpdate = function () {
            var _data = {
                _id: $scope.degreeEdit._id,
                title: $scope.degreeEdit.title,
                acronym: $scope.degreeEdit.acronym
            };
            console.log(_data);
            socket.emit('degree update', _data);
            $scope.reloadPage();
        }
    }])


    .controller('editCourse', ['$scope', '$routeParams', 'socket', function ($scope, $routeParams, socket) {
        $scope.reloadPage = function () {
            window.location.reload();
        };
        socket.emit('course req', $routeParams.course_id);

        socket.on('course send', function (data) {
            $scope.editData = data;
        });

        $scope.courseUpdate = function () {
            var _data = {
                _id: $scope.editData._id,
                title: $scope.editData.title,
                acronym: $scope.editData.acronym,
                description: $scope.editData.description
            };
            socket.emit('course update', _data);
            $scope.reloadPage();
        }
    }])



    .controller('AuditController', ['$scope', 'Audit', function ($scope, Audit) {

        // Setup base var to run audits against.
        $scope.rubric = Audit.data;

        // Update the Audit Grade
        $scope.calculateGrade = function () {

            // temp Array
            var aryGrades = [];

            // Loop through the matrix and break out the values into a clean array
            for (var key in $scope.rubric.auditMatrix) {
                aryGrades.push($scope.rubric.auditMatrix[key]);
            }

            // Calculate the sum of an array
            $scope.rubric.auditGrade = aryGrades.reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });
        };

        // Determine % completed
        $scope.calculateAuditProgress = function (lineItemID, grade, sectionWeight, totalSectionItems) {

            // Add / Update Line Item's grade in the Audit Matix
            $scope.rubric.auditMatrix[lineItemID] = grade * (sectionWeight / totalSectionItems);


            // How many Line Items have been Audited
            var currentAudited = Object.keys($scope.rubric.auditMatrix).length;


            // Calculate Grade after change
            $scope.calculateGrade();


            // Create % of total Line Items Audited
            $scope.rubric.auditProgress = ((currentAudited / $scope.rubric.totalLineItems) * 100);

            return $scope.rubric.auditProgress;
        };

        // User Clicks on a grade weight of a Line Item
        $scope.actionGrade = function (lineItemID, grade) {

            // Error handling for loop not finding supplied ID
            var matchedLineItem = false;

            // TODO clean up this double loop to find the target lineItem based on ID
            angular.forEach($scope.rubric.sections, function (section, sectionKey) {
                angular.forEach(section.lineItems, function (lineItem, lineItemKey) {

                    // Match the ID Supplied against the section's loop's line item loop
                    if (lineItem._id === lineItemID) {
                        lineItem.grade = grade;
                        matchedLineItem = lineItem;
                        // console.log(section.lineItems.length);
                        // Calculate Grade's Affect on Overall Audit
                        $scope.calculateAuditProgress(lineItemID, grade, section.gradeWeight, section.lineItems.length);
                    }
                });
            });

            // Error Handling
            if (!matchedLineItem) {
                console.log('Error: No Item ID Matched for this Rubric');
            }
        };

        // TODO Enhance Output displayed to user.
        $scope.actionOutput = function () {
            console.log($scope.rubric);
        };

    }]);
