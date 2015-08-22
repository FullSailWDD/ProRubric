module.exports = function() {
    
    var db          = require('../config/db'),
        mongoose    = require('mongoose');
        data        = require('../lib/sanitize.js');


    var sectionSchema = mongoose.Schema({

        title : String,
        gradeWeight : Number,
        rubric_id : {type : Number, default : 0},
        created_at : {type : Date, default: Date.now},
        updated_at : {type : Date, default: Date.now}
    });


    var _model = mongoose.model('sections', sectionSchema);
    
    
    
// CRUD Methods 
// ==========================================================================
    
    // ADD
    var _save = function(section, success, fail){

        var newSection = new _model({

            title:        title,
            gradeWeight:  gradeWeight
//            rubric_id:    section.rubric_id
        });


        _model.save(function(err){

            if (err) {
                fail(err);   
            }else{
                success(newSection);   
            }
        });
    };
    
    // UPDATE 
    var _update = function(section,fail,success){

        var cleanData = data.sanitize(section);

            if(cleanData){


                _model.update({'_id':section._id}, {$set:cleanData}, function(err,doc){

                    if (err) {
                        fail(err);
                    }else{
                        success(doc);
                    }

//            if(err) console.log(err);
//            console.log(result);
                });
            }


    };
    
    
    // REMOVE
    var _remove = function(section, fail, success){

        _model.findByIdAndRemove({'_id':section._id}, function(err,doc){


            if (err) {
                fail(err);
            }else{
                success(doc);
            }

//            if(err) return console.log(err);
//            console.log(result);
        });
    };
    
    
// Publicly Available
// ==========================================================================
    return {
        schema :        sectionSchema,
        model :         _model,
        add :           _save,
        update :        _update,
        remove :        _remove
    };
}();