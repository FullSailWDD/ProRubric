module.exports = function() {
    
    var db          = require('../config/db'),
        mongoose    = require('mongoose');
        data        = require('../lib/sanitize.js');
    
    
    var courseSchema = mongoose.Schema({

        title : String,
        acronym : String,
        description : String,
        degree_id : {type : Number, default : 0},
        created_at : {type : Date, default: Date.now},
        updated_at : {type : Date, default: Date.now}
    });
    
    
    var _model = mongoose.model('courses', courseSchema);
    
    
    
    
// CRUD Methods 
// ==========================================================================
    
    // ADD 
    var _save = function(course, success, fail){

        var newCourse = new _model({
            
            title:        course.title,
            acronym:      course.acronym,
            description:  course.description,
            degree_id:    course.degree_id
        });

        newCourse.save(function(err){
            
            if (err) {
                fail (err);
            } else {
                success(newCourse);
            }
        });
    };
    
    
    // UPDATE 
    var _update = function(course,success,fail){

        var cleanData = data.sanitize(course);


        if(cleanData){

            _model.update({'_id':course._id}, {$set:cleanData}, function(err,doc){

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
    var _remove = function(course,success,fail){

        _model.findByIdAndRemove({'_id':course._id}, function(err, doc){
            
//            if(err) return console.log(err);
//            console.log(result);

            if (err) {
                fail(err);
            }else{
                success(doc);
            }
        });
    };
    
    
    
    
// Publicly Available
// ==========================================================================
    return {
        schema :        courseSchema,
        model :         _model,
        add :           _save,
        update :        _update,
        remove :        _remove
    };
}();



