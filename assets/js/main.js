'use strict';
/* globals io,angular,$*/
var socket = io.connect();
            
var App = angular.module('ProRubric', ['ngRoute', 'ngTagsInput']);
            
angular.module('ProRubric').config(function ($interpolateProvider, $routeProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $routeProvider
            .when('/', {
                templateUrl: 'views/searchBar.html',
                controller: 'rubricController'
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
                controller: 'rubricController'
            })
            .when('/addLineItem', {
                templateUrl: 'views/addLineItem.html',
                controller: 'lineItemController'
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
    });
    
 

angular.module('ProRubric').controller('mainController', function ($scope) {
    $scope.degreeAdd = function () {
        var degreeNew = {
            title: $scope.degreeTitle,
            acronym: $scope.degreeAcronym
        };
        socket.emit('add degree', degreeNew);
    };
    socket.once('find degrees', function (data) {
        angular.forEach(data, function (key) {
            $('.columns').append('<div class="pin"><img src="http://placehold.it/140x100"> <h2 class="classname">' + key.title + '</h2> <a href="#">Delete Degree</a></div>');
        });
    });
});

angular.module('ProRubric').directive('genForm', function() {

    return {
        restrict: 'E',
        scope: { 
            payload: '=', // '=' Two-way binding
            callback: '&' // '&' Method Binding
        },
        template:   '<div class="form">' +
                        '<div ng-show="payload.processed"><h1> {[{ payload.successMsg }]} </h1></div>' +
                        '<div ng-hide="payload.processed">' +
                            '<h1> {[{ payload.title }]} </h1>' +
                            '<label data-ng-repeat="input in payload.inputs"><span> {[{ input.dispTitle }]} </span>' +
                                '<input type="text" data-ng-model="input.value" placeholder="{[{ input.placeholder }]}" />' +
                            '</label>' +
                            '<button data-ng-click="callback(payload)"> {[{ payload.actionTitle }]} </button>' +
                        '</div>' +
                    '</div>',
    };
});

angular.module('ProRubric').service('GenFormData', function() {
    var GenForm = function(args) {
        this.title          = args.title         || '';
        this.inputs         = args.aryInputs     || [];
        this.actionTitle    = args.actionTitle   || '';
        this.successMsg     = args.successMsg    || 'Success';
        this.processed      = false;
        this.extractedData;
    };
    GenForm.prototype.addInput = function(input){
        this.inputs.push({
            title: input.title,
            dispTitle: input.dispTitle, 
            placeholder: input.placeholder,
            value: ''
        });
            
    };
    GenForm.prototype.setActionTitle = function(str){
        this.actionTitle = str;
    };
    GenForm.prototype.setTitle = function(str){
        this.title = str;
    };
    GenForm.prototype.extractFormData = function(){
        var objDataCollection = {};
        var aryTargetProps = ['title','value'];

        // Loop all generated inputs
        angular.forEach(this.inputs, function(input, key){
            var objExtration = {};

            // Loop all properties on each input
            for(var prop in input){
                
                // Only target the props in aryTargetProps
                if(aryTargetProps.indexOf(prop) >= 0){

                    // Transpose property and value onto temp obj, building throught the loop
                    objExtration[prop] = input[prop];
                    
                }   
            }

            // Once each input has all targeted props fully stripped and transposed pair up the data from the input
            objDataCollection[objExtration.title] = objExtration.value;
        });
        this.extractedData = objDataCollection;
        return this.extractedData;
    };

    return GenForm;
});


angular.module('ProRubric').controller('rubricController', function ($scope, GenFormData) {

    var rubricAdd = function () {

        // Process the Generated Form's Captured Data
        var rubricNewData = $scope.rubricFormData.extractFormData();

        // Inform the Server of the new Data
        socket.emit('add rubric', rubricNewData);

        // Active Success feature of the form
        $scope.rubricFormData.processed = true;
    };

   
    // Generate a form based upon this info
    $scope.rubricFormData = new GenFormData({
        title: 'Deployment of Web Projects',
        actionTitle: 'Create Rubric',
        successMsg: 'New Rubric Added!',
        aryInputs:[{
                dispTitle: 'Rubric Title', 
                title: 'title', 
                value: '', 
                placeholder: 'Wk2 Assignment Title'
            }, {
                dispTitle: 'Content',
                title: 'content', 
                value: '', 
                placeholder: 'Students Construct a Simple...'
            }]
    });

    // {title: 'xxxx', content: 'yyyy'}

    $scope.actionAdd = rubricAdd;
});




angular.module('ProRubric').controller('lineItemController', function ($scope) {


    $scope.lineItemAdd = function () {
        var lineItemNew = {
            title: $scope.itemTitle,
            content: $scope.itemContent
        };

        socket.emit('add lineItem', lineItemNew);
    };
});


angular.module('ProRubric')
    .service('Audit', function() {
        // TODO Static Data currently. Feed this from the DB and create this data structure.
        this.data = {
                auditMatrix:[],     // Not from the Database
                totalLineItems: 8,  // Not from the Database
                auditProgress: 0,   // Not from the Database
                auditGrade: 0,      // Not from the Database
                _id:        '1324567896543',
                title:      'Deployment Day II',
                content:    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero sem, volutpat eget massa et, mattis accumsan velit. Praesent fermentum a est vel pulvinar. Maecenas vestibulum rutrum erat, sit amet venenatis mi scelerisque non. Integer elementum laoreet velit eu convallis. ',
                gradeTiers: [1,0.75,0.40,0],
                course:     { _id : '9876345345', title: 'Deployment of Web Projects', acronym : 'DWP'},
                sections:   [
                                { 
                                    _id:            '44343433',
                                    title:          'Design',
                                    gradeWeight:    0.5,
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
                                    gradeWeight:    0.5,
                                    lineItems:      [
                                                        { _id : '22233232327', title : 'Semantics', content: 'The study of meaning. In this situation we’re interested in the meaning of your code. Variables, functions, classes, objects, CSS Classes, HTML tags, etc. should all be named clearly, cleanly and semantically to represent the content they contain.' },
                                                        { _id : '22233232328', title : 'Comprehension', content: 'The ability for a 3rd party developer or peer reviewer to transverse your code easily. Unnecessarily complex code structures, code not in use or heavily commented out code are considered bad practices and will be penalized accordingly.' },
                                                        { _id : '22233232329', title : 'MVC File Structure', content: 'Proper file structure and organization for an MVC framework. Views, Models, and Controllers are handled properly.' },
                                                        { _id : '22233232320', title : 'Formatting, Comments, & Logs', content: 'All code should be formatted and commented professionally. Its highly recommended to adopt a consistent pattern and follow it, look into phpDocumentor for references. Additionally, labeled console.log()’s, when used, should be used appropriately and in moderation as to not bombard the reviewer / developer.' },
                                                    ]
                                }
                            ]

            };
    });

angular.module('ProRubric')
    .controller('AuditController', function( $scope, Audit ){
        
        // Setup base var to run audits against.
        $scope.rubric          = Audit.data;

        // Update the Audit Grade
        $scope.calculateGrade   = function(){

            // temp Array
            var aryGrades = [];

            // Loop through the matrix and break out the values into a clean array
            for(var key in $scope.rubric.auditMatrix){
                aryGrades.push($scope.rubric.auditMatrix[key]);
            }
            
            // Calculate the sum of an array
            $scope.rubric.auditGrade = aryGrades.reduce(function(previousValue, currentValue, index, array) {
              return previousValue + currentValue;
            });
        };

        // Determine % completed
        $scope.calculateAuditProgress = function(lineItemID, grade, sectionWeight, totalSectionItems){

            // Add / Update Line Item's grade in the Audit Matix
            $scope.rubric.auditMatrix[lineItemID] = grade * (sectionWeight / totalSectionItems);


            // How many Line Items have been Audited
            var currentAudited = Object.keys($scope.rubric.auditMatrix).length;
            

                // Calculate Grade after change 
                $scope.calculateGrade();                

            
            // Create % of total Line Items Audited
            $scope.rubric.auditProgress = ((currentAudited / $scope.rubric.totalLineItems)*100);

            return $scope.rubric.auditProgress;
        };

        // User Clicks on a grade weight of a Line Item
        $scope.actionGrade  = function (lineItemID, grade) {

            // Error handling for loop not finding supplied ID
            var matchedLineItem = false;

            // TODO clean up this double loop to find the target lineItem based on ID
            angular.forEach($scope.rubric.sections, function (section, sectionKey) {
                angular.forEach(section.lineItems, function (lineItem, lineItemKey) {

                    // Match the ID Supplied against the section's loop's line item loop
                    if(lineItem._id === lineItemID){
                        lineItem.grade = grade;
                        matchedLineItem = lineItem;
                        // console.log(section.lineItems.length);
                        // Calculate Grade's Affect on Overall Audit
                        $scope.calculateAuditProgress(lineItemID, grade, section.gradeWeight, section.lineItems.length);
                    }
                });
            });

            // Error Handling
            if(!matchedLineItem){
                console.log('Error: No Item ID Matched for this Rubric');
            }
        };

        // TODO Enhance Output displayed to user.
        $scope.actionOutput = function(){
            console.log($scope.rubric);
        };

    });

    App.controller('searchBarController', ['$scope', function( $scope ){
      
    }]);