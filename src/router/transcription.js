var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var path = require('path');
const { uuid } = require('uuidv4');

import db from '../models';
const { Op } = require("sequelize");


router.get('/', function(req, res) {
    req.session.active = "transcription";
    db.Student.findAll({ include: [{ model: db.Transcription, required: false, as: "transcriptions" }] }).then(function(data) {
        res.render('admin/transcription/index', { students: data });
    })
});


router.post('/add', function(req, res) {
    var jsondata = req.body;
    jsondata['StudentId'] = jsondata['studentidt'];
    db.Transcription.create(jsondata).then(function(indice) {
        res.redirect('/admin/transcription')
    }).catch(function(err) {
        res.status(500).send(err);
    })

});

router.post('/delete', function(req, res) {
    db.Transcription.destroy({
        where: { id: req.body.id }
    }).then((rep) => {
        res.redirect('/admin/transcription');
    }).catch((error) => {
        return res.status(500).send(error);
    });
});



module.exports = router;