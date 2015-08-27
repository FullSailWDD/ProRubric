module.exports = function(app, socket) {

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
                    outputs.debug(err, 'Return all Degrees', false);
                });
                socket.emit('find degrees', doc);
            }, function (err) {
                outputs.debug(err, 'Return all Degrees', false);
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

            data.on('add degree', function (callback) {
                Degree.add(callback);
            });
            data.on('add course', function (callback) {
                Course.add(callback);
            });

        });

    app.get('/', function(req, res) {

        // route /
        res.render('index');
    });
};