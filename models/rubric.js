module.exports = function() {
 
    var db          = require('../config/db'),
        mongoose    = require('mongoose'),
        data        = require('../lib/sanitize.js');


    var rubricSchema = mongoose.Schema({
        title : String,
        inputs : String,
        content : String,
        grades : String,
        parentId: String,
        course_id : {type : Number, default : 0},
        created_at : {type : Date, default: Date.now},
        updated_at : {type : Date, default: Date.now}
    }),

    _model = mongoose.model('rubrics', rubricSchema);
    
// CRUD Methods 
// ==========================================================================
    
    // ADD 
    var _save = function(rubric, success, fail){

        var newRubric = new _model({
            title:        rubric.title,
            inputs:       rubric.inputs,
            grades:       rubric.grades,
            content:      rubric.content,
            parentId:     rubric.parentId,
        });

            newRubric.save(function(err){
                if (err) {
                    fail (err);
                } else {
                    success(newRubric);
                }
            });
        },

    // UPDATE 
    _update = function(rubric,success,fail){

        var cleanData = data.sanitize(rubric);

        if (cleanData){
            _model.update({'_id':rubric._id}, {$set:cleanData}, function(err,doc){
                if (err) {
                    fail(err);
                }else{
                    success(doc);
                }
            });
        }
    },
            // Find
    _findAll = function(success,fail){
                _model.find({}, function(err,doc){
                    if (err) {
                        fail(err);
                    }else{
                        success(doc);
                    }
                });
    },
    _findOne = function(data, success,fail){
            _model.find(data, function(err,doc) {
                if (err) {
                    fail(err);
                } else {
                    success(doc);
                }
            });
        },

    // REMOVE
    _remove = function(rubric,success,fail){

        _model.findByIdAndRemove({'_id':rubric._id}, function(err,doc){
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
        schema :        rubricSchema,
        model :         _model,
        add :           _save,
        update :        _update,
        remove :        _remove,
        all:            _findAll,
        find:            _findOne
    };
}();    