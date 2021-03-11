var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var path = require('path');
import db from '../models';
const { Op } = require("sequelize");
var fs = require('fs');
import { streamToBuffer } from '@jorgeferrero/stream-to-buffer';



router.get('/', function(req, res) {
    req.session.active = "program";
    var whereclose = {};
    if (req.session.user.role != "superadmin") {
        whereclose = {
            category: req.session.user.category
        };
    }
    db.Program.findAll({
            where: whereclose,
            include: [{
                model: db.File,
                required: false,
            }],
            order: [
                ['numero', 'ASC']
            ],
        }, ).then(function(data) {
            db.File.findAll({ raw: true, nest: true }).then(function(files) {
                res.render('admin/program/index', { programs: data, files: files });
            }).catch(function(error) {
                res.status(500).send(error);
            })
        })
        .catch(function(error) {
            res.status(500).send(error);
        })
});

router.get('/view/:id', function(req, res) {
    db.File.findOne({ where: { id: req.params.id } }).then(function(file) {
        if (file != null) {
            var filepath = __dirname + '/../public/documents/' + file.name;
            if (file.type.split('/').slice(-1)[0] === "pdf") {
                var stream = fs.createReadStream(filepath, 'base64')
                streamToBuffer(stream).then((data) => {
                    res.render('admin/program/pdf', { file: file, stream: data })
                });

            } else if (file.type.split('/')[0] === "video") {
                var stream = fs.createReadStream(filepath, 'base64')
                streamToBuffer(stream).then((data) => {
                    res.render('admin/program/video', { file: file, stream: 'data:' + file.type + ';base64,' + data })
                });
            } else {
                res.redirect('/admin/program')
            }
        } else {
            res.redirect('/admin/program')
        }
    });
});


router.get('/file/remove/:id', function(req, res) {
    db.File.update({ ProgramId: null }, { where: { id: req.params.id } }).then(function(indice) {
        res.redirect('/admin/program')
    });
});
router.post('/add', function(req, res) {
    var jsondata = req.body;
    db.Program.create(jsondata).then(function(indice) {
        res.redirect('/admin/program')
    }).catch(function(err) {
        res.status(500).send(err);
    })

});

router.post('/delete', function(req, res) {
    var jsondata = req.body;
    db.Program.destroy({ where: { id: jsondata.id } }).then(function(indice) {
        res.redirect('/admin/program')
    }).catch(function(err) {
        res.status(500).send(err);
    })
});

router.post('/file/add', function(req, res) {
    var jsondata = req.body;
    console.log(jsondata);
    db.Program.findByPk(jsondata.id).then((program) => {
        console.log(jsondata.files)
        if (typeof(jsondata.files) === typeof([])) {
            var increment = 0;
            jsondata.files.forEach(function(el, index, array) {
                increment++;
                db.File.update({ ProgramId: program.id }, { where: { id: el } }).then(function(indice) {
                    if (increment === array.length) {
                        res.redirect('/admin/program')
                    }
                });
            })
        } else {
            db.File.findByPk(jsondata.files).then(function(file) {
                file.update({ ProgramId: program.id }, { where: { id: jsondata.files } }).then(function(indice) {
                    res.redirect('/admin/program')
                });
            });

        }
    })

});

router.post('/update', function(req, res) {
    var jsondata = req.body;
    var id = jsondata.id;
    delete jsondata['id']
    db.Program.update(jsondata, { where: { id: id } }).then(function(indice) {
        res.redirect('/admin/program')
    }).catch(function(err) {
        res.status(500).send(err);
    })
});

router.post('/present', function(req, res) {
    var jsondata = req.body;
    var id = jsondata.id;
    delete jsondata['id'];
    var matricule = jsondata['matricule']
    db.Student.findOne({ where: { matricule: matricule } }).then((student) => {
        if (student != null) {
            db.Program.findByPk(id).then((function(program) {
                student.setPresents([program]).then((sp) => {
                    res.redirect('/admin/program')
                })
            }))
        } else {
            res.redirect('/admin/program');
        }
    })

});



module.exports = router;