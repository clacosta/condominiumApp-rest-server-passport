var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Letters = require('../models/letters');
var Verify = require('./verify');

var lettersRouter = express.Router();
lettersRouter.use(bodyParser.json());

lettersRouter.route('/')
.get(function (req, res, next) {        
    Letters.find(req.query)
        .populate('author')
        .populate('building')
        .exec(function (err, letters) {
        if (err) throw err;
        res.json(letters);                
    });
})

.post(function (req, res, next) {
    Letters.create(req.body, function (err, letters) {
        if (err) throw err;
        console.log('Letter / Package created!');
        var id = letters._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the letters / packages with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Letters.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

lettersRouter.route('/:lettersId')
.get(function (req, res, next) {    
    Letters.findById(req.params.lettersId)
        .populate('author')
        .populate('building')
        .exec(function (err, letters) {
        if (err) throw err;
        res.json(letters);
    });
})

.put(function (req, res, next) {
    Letters.findByIdAndUpdate(req.params.lettersId, {
        $set: req.body
    }, {
        new: true
    }, function (err, letters) {
        if (err) throw err;
        res.json(letters);
    });
})

.delete(function (req, res, next) {
    Letters.findByIdAndRemove(req.params.lettersId, function (err, resp) {        
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = lettersRouter;