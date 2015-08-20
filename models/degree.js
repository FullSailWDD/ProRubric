/**
 * Created by patrickhalton on 8/19/15.
 */

var db          = require('../config/db'),
    mongoose    = require('mongoose');

var degreeModel = mongoose.model('degrees', degSchema);


var degSchema = mongoose.Schema({

    title : String,
    acronym : String,
//    parent_id : {type : Number, default : 0},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}

});

exports.insertDegrees = function(degName,degAck){

    var degrees = new degreeModel({

        title : degName,
        acronym : degAck

    });

    degrees.save(function(err,result){

        if (err) return console.log(err);
        console.log(result);

    });

};

exports.removeByTitle = function (title, success, fail){
    removeDegreeModel.findOneAndRemove({title : title}, function (err, doc){
        if (err) {
            fail(err);
        } else if(!err && doc === null) {
            // No technical error, just logistical
            fail({error: "No Matching title to Remove"});
        } else if(!err && doc != null) {
            //success
            success(doc);
        }
    });
};
