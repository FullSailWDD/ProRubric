module.exports = function(app, socket){

    var db          = require('../config/db'),
        mongoose    = require('mongoose'),
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

            var cleanData = data.sanitize(degree);

            if(cleanData){

                var newDegree = new _model({
                    title:        cleanData.title,
                    acronym:      cleanData.acronym
                });

                newDegree.save(function(err){
                    if (err) {
                        fail (err);
                    } else {
                        success(newDegree);
                    }
                });

            }


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
        _remove = function(degree,success,fail){

            var cleanData = data.sanitize(degree);

            if (cleanData){

                _model.findByIdAndRemove({'_id':cleanData._id} , function(err,doc){
                    if (err) {
                        fail(err);
                    }else{
                        success(doc);
                    }
                });

            }


        };

    _all = function(success,fail){

        _model.find({}, function(err,doc){

            if (err) {
                fail(err);
            }else{
                success(doc);
            }
        });
        // }

    };

// Publicly Available
// ==========================================================================
    return {
        schema :        degreeSchema,
        model :         _model,
        add :           _save,
        update :        _update,
        remove :        _remove,
        all :           _all
    };
}();