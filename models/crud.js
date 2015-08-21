/**
 * Created by patrickhalton on 8/18/15.
 */
    var db          = require('../config/db'),
        mongoose    = require('mongoose');

var degSchema = mongoose.Schema({

    title : String,
    acronym : String,
//    parent_id : {type : Number, default : 0},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}

}),
    courseSchema = mongoose.Schema({

    title : String,
    content : String,
    acronym : String,
    degree_id : {type : Number, default : 0},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}

}),
    rubricSchema = mongoose.Schema({

    title : String,
    content : String,
    course_id : {type : Number, default : 0},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}

}),
    sectionSchema = mongoose.Schema({

    title : String,
    content : String,
    rubric_id : {type : Number, default : 0},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}

}),
    lineItemSchema = mongoose.Schema({

    title : String,
    content : String,
    section_id : {type : Number, default : 0},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}

});

var degreeModel = mongoose.model('degrees', degSchema),
    courseModel = mongoose.model('courses', courseSchema),
    rubricModel = mongoose.model('rubrics', rubricSchema),
    sectionModel = mongoose.model('sections', sectionSchema),
    lineItemModel = mongoose.model('lineItems', lineItemSchema),
    removeDegreeModel = mongoose.model('removeDegrees',degSchema);



    exports.insertDegrees = function(degName,degAck,success){

        var degrees = new degreeModel({
            title : degName,
            acronym : degAck
        });

        degrees.save(function(err,result){
            if (err) return console.log(err);
            success(result);
        });

    };

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

exports.insertRubric = function(rubName,rubContent){

    var rubric = new rubricModel({

        title : rubName,
        content : rubContent

    });

    rubric.save(function(err,result){

        if (err) return console.log(err);
        console.log(result);

    });


};

exports.insertSection = function(secName,secContent){

    var section = new sectionModel({

        title : secName,
        content : secContent

    });

    section.save(function(err,result){

        if (err) return console.log(err);
        console.log(result);

    });


};

exports.lineItemSection = function(liName,liContent){

    var lineItem = new lineItemModel({

        title : liName,
        content : liContent

    });

    lineItem.save(function(err,result){

        if (err) return console.log(err);
        console.log(result);

    });

};




