var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var path = require('path');
const { uuid } = require('uuidv4');

import db from '../models';
const { Op } = require("sequelize");


router.get('/', function(req, res) {
    req.session.active = "transcription";
    var whereclose = {};
    if (req.session.user.role != "admin" && req.session.user.role != "superadmin") {
        whereclose = {
            category: req.session.user.category
        }
    }

    db.Student.findAll({ raw: true, nest: true, where: whereclose }).then(function(data) {
        db.Transcription.findAll({
            raw: true,
            nest: true,
            order: [
                ['id', 'ASC']
            ]
        }).then(function(notes) {
            // console.log(data[0]) 
            // console.log(notes[0])
            Promise.all(data.map(async function(m) {
                m['notes'] = await Promise.all(notes.map(async function(note) {
                    var snote = await db.TStudent.findOne({ where: { StudentId: m.id, TranscriptionId: note.id } })
                    if (snote == null) {
                        snote = {
                            null: true
                        };
                    } else {
                        snote['null'] = false

                    }
                    snote['transcription'] = note;
                    return snote;
                }));
                return m;
            })).then((newstudents) => {
                console.log(newstudents[0])
                res.render('admin/transcription/index', { students: newstudents, notes: notes });
            });
        })
    })
});


router.post('/add', function(req, res) {
    var jsondata = req.body;
    db.Transcription.create(jsondata).then(function(indice) {
        res.redirect('/admin/transcription')
    }).catch(function(err) {
        res.status(500).send(err);
    })

});

router.post('/add/note', function(req, res) {
    var jsondata = req.body;
    db.TStudent.create(jsondata).then(function(indice) {
        res.redirect('/admin/transcription')
    }).catch(function(err) {
        res.status(500).send(err);
    })

});

router.post('/note/delete', function(req, res) {
    db.TStudent.destroy({
        where: req.body
    }).then((rep) => {
        res.redirect('/admin/transcription');
    }).catch((error) => {
        return res.status(500).send(error);
    });
});

router.post('/edit', function(req, res) {
    var jsondata = req.body
    var id = jsondata['id']
    delete jsondata['id'];
    db.Transcription.findByPk(id).then((trans) => {
        if(trans != null){
            trans.update(jsondata).then((trans) => {
                res.redirect('/admin/transcription');
            });
        }
        else{     
            return res.status(500).send(error);
        }
    }).catch((error) => {
        return res.status(500).send(error);
    });
});

router.post('/delete', function(req, res) {
    db.Transcription.destroy({
        where: req.body
    }).then((rep) => {
        res.redirect('/admin/transcription');
    }).catch((error) => {
        return res.status(500).send(error);
    });
});


module.exports = router;