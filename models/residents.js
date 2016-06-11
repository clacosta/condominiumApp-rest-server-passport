// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var residentsSchema = new Schema({
    firstname: {
        type: String,
        required: true        
    },
    lastname: {
        type: String,
        required: true        
    },
    phone: {
        type: String,
        required: true        
    },    
    image: {
        type: String,
        required: true        
    },            
    description: {
        type: String,
        required: true
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
var Residents = mongoose.model('Resident', residentsSchema);

// make this available to our Node applications
module.exports = Residents;