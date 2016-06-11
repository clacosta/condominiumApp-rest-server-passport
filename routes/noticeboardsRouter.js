var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var NoticeBoards = require('../models/noticeboards');
var Verify = require('./verify');

var noticeboardsRouter = express.Router();
noticeboardsRouter.use(bodyParser.json());

noticeboardsRouter.route('/')
.get(function (req, res, next) {        
    NoticeBoards.find(req.query)
        .populate('author')
        .populate('recipient')
        .exec(function (err, noticeboards) {
        if (err) throw err;
        res.json(noticeboards);                
    });
})

.post(function (req, res, next) {
    NoticeBoards.create(req.body, function (err, noticeboards) {
        if (err) throw err;
        console.log('Notice Board created!');
        var id = noticeboards._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the notice board with id: ' + id);
    });
})

.delete(function (req, res, next) {
    NoticeBoards.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

noticeboardsRouter.route('/:noticeboardsId')
.get(function (req, res, next) {    
    NoticeBoards.findById(req.params.noticeboardsId)
        .populate('author')
        .populate('recipient')
        .exec(function (err, noticeboards) {
        if (err) throw err;
        res.json(noticeboards);
    });
})

.put(function (req, res, next) {
    NoticeBoards.findByIdAndUpdate(req.params.noticeboardsId, {
        $set: req.body
    }, {
        new: true
    }, function (err, noticeboards) {
        if (err) throw err;
        res.json(noticeboards);
    });
})

.delete(function (req, res, next) {
    NoticeBoards.findByIdAndRemove(req.params.noticeboardsId, function (err, resp) {        
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = noticeboardsRouter;