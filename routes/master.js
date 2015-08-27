module.exports = function(app, socket) {

    var Degree = require('../models/degree.js'),
        Course = require('../models/course.js'),
        Rubric = require('../models/rubric.js'),
        Section = require('../models/section.js'),
        LineItem = require('../models/lineItem.js');

    // route /
    app.get('/', function(req, res) {
        socket.on('connection', function (data) {
                Degree.all(function(doc){
                    socket.emit('find degrees',doc);
                }, function(err){
                    outputs.debug(err, 'Return all Degrees', false);
                });

            data.on('add degree', function (callback) {
                Degree.add(callback);
            });

            data.on('add section', function (payload) {
                Section.add(payload);
            });
            
            data.on('add rubric', function (callback) {
                Rubric.add(callback);
            });
            
            data.on('add lineItem', function (callback) {
                LineItem.add(callback);
            });

            data.on('edit rubric', function(payload){// payload is the object that is getting passed through from the front end

                Rubric.update(payload, function(doc){//running the update function through the rubric model(1st and 2nd parameter from rubric update function)
                    console.log('We totally updated a rubric');
                    socket.emit('edited rubric',doc);//telling the front end to send the object back from the database

                }, function(err){//3rd parameter in rubric model for error handling (fail)
                    socket.emit('error',err)
                });

            });

            data.on('find rubric',function(payload){

                Rubric.find(payload,function(doc){

                    socket.emit('returned id',doc);

                },function(error){
                    console.log(error);
                });

            });

        });

        res.render('index');
    });
};