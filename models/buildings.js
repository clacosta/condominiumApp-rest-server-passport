// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var buildingsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true        
    },        
    image: {
        type: String,
        required: true        
    },            
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Buildings = mongoose.model('Building', buildingsSchema);

// make this available to our Node applications
module.exports = Buildings;