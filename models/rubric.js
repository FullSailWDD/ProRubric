module.exports = function() {
 
    var db          = require('../config/db'),
        mongoose    = require('mongoose');


    var rubricSchema = mongoose.Schema({

        title : String,
        content : String,
        course_id : {type : Number, default : 0},
        created_at : {type : Date, default: Date.now},
        updated_at : {type : Date, default: Date.now}
    });

    
    var _model = mongoose.model('rubrics', rubricSchema);
    
    
    

// CRUD Methods 
// ==========================================================================
    
    // ADD 
    var _save = function(rubric, success, fail){

        var newRubric = new _model({
            
            title:        rubric.title,
            content:      rubric.content,
            course_id:    rubric.course_id
        });

        newCourse.save(function(err){
            
            if (err) {
                fail (err);
            } else {
                success(newRubric);
            }
        });
    };
    
    
    // UPDATE 
    var _update = function(rubric){

        _model.update({'_id':rubric._id}, {$set:{'title':rubric.title}}, function(err, result){
            
            if(err) console.log(err);
            console.log(result);
        });
    };
    
    
    // REMOVE
    var _remove = function(rubric){

        _model.findByIdAndRemove({'_id':rubric._id}, function(err, result){
            
            if(err) return console.log(err);
            console.log(result);
        });
    };
    
    
    
    
// Publicly Available
// ==========================================================================
    return {
        schema :        rubricSchema,
        model :         _model,
        add :           _save,
        update :        _update,
        remove :        _remove
    };
}();    