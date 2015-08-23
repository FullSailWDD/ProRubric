module.exports = function (){

    var db          = require('../config/db'),
        mongoose    = require('mongoose');
        data        = require('../lib/sanitize.js');


    var degreeSchema = mongoose.Schema({
            title : String,
            acronym : String,
            created_at : {type : Date, default: Date.now},
            updated_at : {type : Date, default: Date.now}
        }),

        _model = mongoose.model('degrees', degreeSchema),

    // ADD
        _save = function(degree, success, fail){

            var newDegree = new _model({
                title:        degree.title,
                acronym:      degree.acronym
            });

            newDegree.save(function(err){
                if (err) {
                    fail (err);
                } else {
                    success(newDegree);
                }
            });
        },

    // UPDATE 
        _update = function(degree,success,fail){

            var cleanData = data.sanitize(degree);

            if(cleanData){
                _model.update({'_id':degree._id}, {$set:cleanData}, function(err,doc){
                    if (err) {
                        fail(err);
                    }else{
                        success(doc);
                    }
                });
            }


        },

    // FIND
    _findAll = function () {
        var callback = function(){
            return function(err, data){
                if (err){
                    console.log('error occured');
                    return;
                }
            }
        };
        _model.find({}, callback());
        return callback()
    },

    // REMOVE
        _remove = function(degree,success,fail){

            _model.findByIdAndRemove({'_id':degree._id}, function(err,doc){
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
        schema :        degreeSchema,
        model :         _model,
        add :           _save,
        update :        _update,
        remove :        _remove,
        find:           _findAll
    };
}();
