/**
 * Created by patrickhalton on 8/19/15.
 */

var db          = require('../config/db'),
    mongoose    = require('mongoose');


var sectionSchema = mongoose.Schema({

    title : String,
    content : String,
    rubric_id : {type : Number, default : 0},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}

});


var sectionModel = mongoose.model('sections', sectionSchema);


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
