module.exports = function (app, socket) {

    var Degree = require('../models/degree.js'),
        Course = require('../models/course.js'),
        Rubric = require('../models/rubric.js'),
        Section = require('../models/section.js'),
        LineItem = require('../models/lineItem.js'),
        outputs = require('../lib/outputs.js');


        socket.on('connection', function (data) {

            Degree.all(function (doc) {
                Course.all(function (doc) {
                    socket.emit('find course', doc);
                }, function (err) {
                    console.log(err);
                });
                socket.emit('find degrees', doc);
            }, function (err) {
                console.log(err);
            });

            Course.all(function (doc) {
                socket.emit('find courses', doc);
            }, function (err) {
                console.log(err);
            });

            data.once('course update', function (data) {
                Course.update(data, function (err) {
                    console.log(err, 'Return all update');
                });
            });

            data.once('degree update', function (data) {
                Degree.update(data, function (err) {
                    console.log(data);
                    console.log(err, 'Return all update');
                });
            });


            data.once('course req', function (data) {
                console.log(data);
                Course.findone(data, function (doc) {
                    console.log(doc);
                    socket.emit('course send', doc);
                }, function (err) {
                    console.log(err, 'Return all Courses', false);
                });
            });
            data.on('add lineItem', function (callback) {
                LineItem.add(callback);
            });
            data.on('add rubric', function (callback) {
                Rubric.add(callback);
            });

            data.once('degree req', function (data) {
                console.log(data);
                Degree.findone(data, function (doc) {
                    console.log(doc);
                    socket.emit('degree send', doc);
                }, function (err) {
                    console.log(err, 'Return all Courses', false);
                });
            });

            data.on('add degree', function (callback) {
                Degree.add(callback);
            });
            data.on('add course', function (callback) {
                Course.add(callback);
            });

            data.on('delete degree', function (callback) {
                console.log(callback);
                Degree.remove(callback);
            });
            data.on('delete course', function (callback) {
                console.log(callback);
                Course.remove(callback);
            });
            data.on('find rubric',function(payload){
                Rubric.find(payload,function(doc){
                    socket.emit('returned id',doc);
                },function(error){
                    console.log(error);
                });
            });

            data.on('edit rubric', function(payload){// payload is the object that is getting passed through from the front end
                Rubric.update(payload, function(doc){//running the update function through the rubric model(1st and 2nd parameter from rubric update function)
                    console.log('We totally updated a rubric');
                    socket.emit('edited rubric',doc);//telling the front end to send the object back from the database
                }, function(err){//3rd parameter in rubric model for error handling (fail)
                    socket.emit('error',err)
                });
            });
        });
    // route /
    app.get('/', function(req, res) {

        // route /
        res.render('index');
    });
};