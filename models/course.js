/**
 * Created by patrickhalton on 8/19/15.
 */

var db          = require('../config/db'),
    mongoose    = require('mongoose');

var courseSchema = mongoose.Schema({

    title : String,
    content : String,
    acronym : String,
    degree_id : {type : Number, default : 0},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}

});

var courseModel = mongoose.model('courses', courseSchema);

exports.insertCourse = function(courName,courAck,courContent){

    var course = new courseModel({

        title : courName,
        acronym : courAck,
        content : courContent

    });

    course.save(function(err,result){

        if (err) return console.log(err);
        console.log(result);

    });

};



