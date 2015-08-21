module.exports = function() {
    
    var db          = require('../config/db'),
        mongoose    = require('mongoose');


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
            gradeWeight:  gradeWeight,
//            rubric_id:    section.rubric_id
        });


        newLineItem.save(function(err){

            if (err) {
                fail(err);   
            }else{
                success(newSection);   
            }
        });
    };
    
    // UPDATE 
    var _update = function(section){

        _model.update({'_id':section._id}, {$set:{'title':section.title}}, function(err, result){
            
            if(err) console.log(err);
            console.log(result);
        });
    };
    
    
    // REMOVE
    var _remove = function(section){

        _model.findByIdAndRemove({'_id':section._id}, function(err, result){
            
            if(err) return console.log(err);
            console.log(result);
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