module.exports = function (){
    var db          = require('../config/db'),
        mongoose    = require('mongoose');

    var lineItemSchema = mongoose.Schema({
        title : String,
        content : String,
        section_id : {type : Number, default : 0},
        created_at : {type : Date, default: Date.now},
        updated_at : {type : Date, default: Date.now}
    });

    var _model = mongoose.model('lineItems', lineItemSchema);


    // CRUD Methods 
    // ============================================================================================================
    
    var _save = function (lineItem, success, fail){
        var newLineItem = new _model({
            title:          lineItem.title,
            content:        lineItem.content,
            section_id:     lineItem.section_id
        });

        newLineItem.save(function(err){
            if (err) {
                fail (err);
            } else {
                success(newLineItem);
            }
        });
    };


    // Publicly Available
    // ============================================================================================================
    return {
        schema :        lineItemSchema,
        model :         _model,
        add:            _save
    };
}();