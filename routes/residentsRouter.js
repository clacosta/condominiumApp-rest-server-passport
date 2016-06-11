var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Residents = require('../models/residents');
var Verify = require('./verify');

var residentsRouter = express.Router();
residentsRouter.use(bodyParser.json());

residentsRouter.route('/')
.get(function (req, res, next) {    
    Residents.find(req.query)
        .populate('building')
        .exec(function (err, residents) {
        if (err) throw err;
        res.json(residents);
    });
})

.post(function (req, res, next) {
    Residents.create(req.body, function (err, residents) {
        if (err) throw err;
        console.log('Resident created!');
        var id = residents._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the resident with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Residents.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

residentsRouter.route('/:residentsId')
.get(function (req, res, next) {    
    Residents.findById(req.params.residentsId)
        .populate('building')
        .exec(function (err, residents) {
        if (err) throw err;
        res.json(residents);
    });
})

.put(function (req, res, next) {
    Residents.findByIdAndUpdate(req.params.residentsId, {
        $set: req.body
    }, {
        new: true
    }, function (err, residents) {
        if (err) throw err;
        res.json(residents);
    });
})

.delete(function (req, res, next) {
    Residents.findByIdAndRemove(req.params.residentsId, function (err, resp) {        
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = residentsRouter;