module.exports = function(app, socket){

    var db          = require('../config/db'),
        mongoose    = require('mongoose');
        data        = require('../lib/sanitize.js');


    var degreeSchema = mongoose.Schema({
            title : String,
            acronym : String,
            type: String,
            created_at : {type : Date, default: Date.now},
            updated_at : {type : Date, default: Date.now}
        }),

        _model = mongoose.model('degrees', degreeSchema),

    // ADD
        _save = function(degree, success, fail){

            var newDegree = new _model({
                title:        degree.title,
                acronym:      degree.acronym,
                type:         'degree'
            });

            newDegree.save(function(err){
                if (err) {
                    fail (err);
                } else {
                    success(newDegree);
                }
            });
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
            _model.find({_id:data}, function(err,doc) {
                if (err) {
                    fail(err);
                } else {
                    success(doc);
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

    // REMOVE
        _remove = function(degree){
            _model.findByIdAndRemove(degree, function(err){
                if(err){
                    console.log(err);
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
        all:            _findAll,
        findone:        _findOne
    };
}();
