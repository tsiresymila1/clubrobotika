var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var path = require('path');
const { uuid } = require('uuidv4');

import db from '../models';
const { Op } = require("sequelize");


function recursiveStudent(students, notes, index, studentsnews, callback) {
    if (index >= students.length) {
        callback(studentsnews)
    } else {
        var m = students[index];
        var snotes = [];
        recursiveTranscription(m, notes, 0, snotes, function(student_notes) {
            m['notes'] = student_notes
            studentsnews.push(m);
            recursiveStudent(students, notes, index + 1, studentsnews, callback)
        })

    }
}

function recursiveTranscription(m, notes, index, student_notes, callback) {
    if (index >= notes.length) {
        callback(student_notes)
    } else {
        var note = notes[index]
        db.TStudent.findOne({ where: { StudentId: m.id, TranscriptionId: note.id } }).then(function(snote) {
            if (snote == null) {
                snote = {
                    null: true
                };
            } else {
                snote['null'] = false
            }
            snote['transcription'] = note;
            student_notes.push(snote)
            recursiveTranscription(m, notes, index + 1, student_notes, callback)
        })

    }
}


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

            recursiveStudent(data, notes, 0, [], function(newstudents) {
                console.log(newstudents[0])
                res.render('admin/transcription/index', { students: newstudents, notes: notes });
            })
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
        if (trans != null) {
            trans.update(jsondata).then((trans) => {
                res.redirect('/admin/transcription');
            });
        } else {
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