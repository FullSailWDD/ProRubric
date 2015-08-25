module.exports = function() {
    var db          = require('../config/db'),
        mongoose    = require('mongoose'),
        data        = require('../lib/sanitize.js');
    
    
    var lineItemSchema = mongoose.Schema({
        title : String,
        content : String,
        section_id : {type : Number, default : 0},
        created_at : {type : Date, default: Date.now},
        updated_at : {type : Date, default: Date.now}
    }),
    
    
    _model = mongoose.model('lineItems', lineItemSchema);

    var _save = function(lineItem, success, fail){

        var cleanData = data.sanitize(lineItem);

        if (cleanData){

            var newLineItem = new _model({
                title:      cleanData.title,
                content:    cleanData.content,
                section_id: cleanData.section_id
            });


            newLineItem.save(function(err){
                if (err) {
                    fail(err);
                }else{
                    success(newLineItem);
                }
            });

        }


        },
    
    // UPDATE 
    _update = function(lineItem, success, fail){

       var cleanData = data.sanitize(lineItem);

            if(cleanData){

                _model.update({'_id':lineItem._id}, {$set:cleanData}, function(err,doc){
                    if (err) {
                        fail(err);
                    }else{
                        success(doc);
                    }

                });

            }
    },
    
    // REMOVE
    _remove = function(lineItem,success,fail){

        var cleanData = data.sanitize(lineItem);

        if(cleanData){

            _model.findByIdAndRemove({'_id':cleanData._id}, function(err,doc){

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
        schema :        lineItemSchema,
        model :         _model,
        add :           _save,
        update :        _update,
        remove :        _remove,
        all :           _all
    };

}();

