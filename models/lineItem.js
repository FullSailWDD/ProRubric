/**
 * Created by patrickhalton on 8/19/15.
 */

var db          = require('../config/db'),
    mongoose    = require('mongoose');

var lineItemSchema = mongoose.Schema({

    title : String,
    content : String,
    section_id : {type : Number, default : 0},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}

});

var lineItemModel = mongoose.model('lineItems', lineItemSchema);


exports.lineItemSection = function(liName,liContent){

    var lineItem = new lineItemModel({

        title : liName,
        content : liContent

    });

    lineItem.save(function(err,result){

        if (err) return console.log(err);
        console.log(result);

    });

};
