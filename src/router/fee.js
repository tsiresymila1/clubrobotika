var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var path = require('path');
const { uuid } = require('uuidv4');

import db from '../models';
const { Op } = require("sequelize");


router.get('/', function(req, res) {
    req.session.active = "fee";
    if (req.session.user.role != "admin" && req.session.user.role != "superadmin") {
        res.redirect('/admin')
    }
    var months_fullname = [
        "Janvier", "Fevrier", "Mars",
        "Avril", "Mai", "Juin", "Juillet",
        "Aout", "Septembre", "Octobre",
        "Novembre", "Decembre"
    ]
    db.Student.findAll({ raw: true, nest: true }).then(function(data) {
        db.Fee.findAll({
            raw: true,
            nest: true,
            order: [
                ['id', 'ASC']
            ]
        }).then(function(fees) {
            Promise.all(data.map(async function(m) {
                m['fees'] = await Promise.all(fees.map(async function(fee) {
                    var sfee = await db.FStudent.findOne({ where: { StudentId: m.id, FeeId: fee.id } })
                    if (sfee == null) {
                        sfee = {
                            null: true
                        };
                    } else {
                        sfee['null'] = false
                    }
                    sfee['fee'] = fee;
                    return sfee;
                }));
                return m;
            })).then((newstudents) => {
                console.log(newstudents[0])
                res.render('admin/fee/index', { students: newstudents, fees: fees, months: months_fullname });
            });
        })
    })
});


router.post('/add', function(req, res) {
    var jsondata = req.body;
    db.Fee.create(jsondata).then(function(indice) {
        res.redirect('/admin/fee')
    }).catch(function(err) {
        res.status(500).send(err);
    })

});

router.post('/edit', function(req, res) {
    var jsondata = req.body;
    var updatejsondata = {...jsondata };
    delete jsondata['ispay'];
    db.FStudent.findOne({ where: jsondata }).then(function(fstudent) {
        if (fstudent != null) {
            fstudent.update(updatejsondata).then(() => {
                res.redirect('/admin/fee')
            })
        } else {
            db.FStudent.create(updatejsondata).then(() => {
                res.redirect('/admin/fee')
            })
        }
    }).catch(function(err) {
        res.status(500).send(err);
    })

});

router.post('/delete', function(req, res) {
    db.Fee.destroy({
        where: req.body
    }).then((rep) => {
        res.redirect('/admin/fee');
    }).catch((error) => {
        return res.status(500).send(error);
    });
});



module.exports = router;