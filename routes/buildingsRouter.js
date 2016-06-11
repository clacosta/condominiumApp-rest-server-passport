var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Buildings = require('../models/buildings');
var Verify = require('./verify');

var buildingsRouter = express.Router();
buildingsRouter.use(bodyParser.json());

buildingsRouter.route('/')
.get(function (req, res, next) {
    Buildings.find(req.query, function (err, buildings) {
        if (err) throw err;
        res.json(buildings);
    });
})

.post(function (req, res, next) {
    Buildings.create(req.body, function (err, buildings) {
        if (err) throw err;
        console.log('Building created!');
        var id = buildings._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the building with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Buildings.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

buildingsRouter.route('/:buildingsId')
.get(function (req, res, next) {
    Buildings.findById(req.params.buildingsId, function (err, buildings) {
        if (err) throw err;
        res.json(buildings);
    });
})

.put(function (req, res, next) {
    Buildings.findByIdAndUpdate(req.params.buildingsId, {
        $set: req.body
    }, {
        new: true
    }, function (err, buildings) {
        if (err) throw err;
        res.json(buildings);
    });
})

.delete(function (req, res, next) {
    Buildings.findByIdAndRemove(req.params.buildingsId, function (err, resp) {        
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = buildingsRouter;