// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var lettersSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    trackingcode: {
        type: String,
        default: ''
    },
    letterStatus: {
        type: Number,        
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident'
    },
    building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building'
    }
}, {
        timestamps: true
    });

// the schema is useless so far
// we need to create a model using it
var Lettters = mongoose.model('Letter', lettersSchema);

// make this available to our Node applications
module.exports = Lettters;