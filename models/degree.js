var db          = require('../config/db'),
    mongoose    = require('mongoose'),
    ObjectID    = require('mongoose');



var degSchema = mongoose.Schema({

    title : String,
    acronym : String,
//    parent_id : {type : Number, default : 0},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}

}),
    degreeModel = mongoose.model('degrees', degSchema);


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

exports.updateDegree = function(degreeId){

    //finds the entry based on _id and then inserts a new title......for now
    degreeModel.update({'_id':'55d4d9abef10520d329dc060'}, {$set:{'title':'i like dogs'}}, function(err, result){
        if(err) return console.log(err);
        console.log(result);
    });
};

exports.removeDegree = function(degreeId){

    //finds the entry based on _id and then inserts a new title......for now
    degreeModel.findByIdAndRemove({'_id':'55d4fe33c2d40acb9e0f1d9f'}, function(err, result){
        if(err) return console.log(err);
        console.log(result);
    });
};
