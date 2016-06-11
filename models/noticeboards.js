// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var noticeboardsSchema = new Schema({
    message: {
        type: String,
        required: true        
    },
    messageType:  {
        type: Number,
        default: '0',              
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident'
    }    
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var NoticeBoards = mongoose.model('NoticeBoard', noticeboardsSchema);

// make this available to our Node applications
module.exports = NoticeBoards;