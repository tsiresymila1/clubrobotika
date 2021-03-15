var express = require('express')
const { Op } = require("sequelize");
const crypto = require('crypto');
var router = express.Router();
import db from "../models";


router.get('/', function(req, res) {
    req.session.active = "account";
    db.Coach.findAll({ raw: true, nest: true, }).then((data) => {
        db.Student.findAll({ raw: true, nest: true, where: { category: req.session.user.category } }).then((student) => {
            db.Program.findAll({ raw: true, nest: true, where: { category: req.session.user.category } }).then((programs) => {
                res.render('admin/coach/account', { coachs: data, students: student, programs: programs });
            }).catch((error) => {
                res.status(500).send(error);
            });
        }).catch((error) => {
            res.status(500).send(error);
        });
    }).catch((error) => {
        res.status(500).send(error);
    });
});

router.get('/add', function(req, res) {
    req.session.active = "account";
    res.render('admin/coach/index', );
});

router.post('/update', function(req, res) {
    var imagefile = req.files;
    var datajson = req.body;
    if (imagefile != null) {
        var uploadPath = __dirname + '/../public/assets/profile/' + imagefile.file.name;
        imagefile.file.mv(uploadPath, function(err) {
            if (err) return res.status(500).send(err);
            var datajson = req.body;
            delete datajson['file']
            datajson['image'] = imagefile.file.name;
            var id = datajson.id;
            delete datajson['id'];
            // console.log(datajson, id);
            db.Coach.update(datajson, { where: { id: id } }).then(() => {
                db.Coach.findOne({
                    raw: true,
                    nest: true,
                    where: {
                        id: id
                    }
                }).then(function(resultat) {
                    req.session.auth = true;
                    req.session.user = resultat;
                    console.log(resultat);
                    res.redirect('/admin/account');
                }).catch(function(err) {
                    res.redirect('/admin/login');
                })
            }).catch((error) => {
                console.log('Error 1');
                res.send(error).status(500);
            })

        });
    } else {
        var id = datajson.id;
        delete datajson['id'];
        db.Coach.update(datajson, { where: { id: id } }).then(() => {
            db.Coach.findOne({
                raw: true,
                nest: true,
                where: {

                    id: id
                }
            }).then(function(resultat) {
                req.session.auth = true;
                req.session.user = resultat;
                res.redirect('/admin/account');
            }).catch(function(err) {
                res.redirect('/admin/login');
            })
        }).catch((error) => {
            console.log('Error 2');
            res.send(error).status(500);
        });
    }
});

router.post('/password', function(req, res) {
    var datajson = req.body;
    var id = datajson.id;
    delete datajson['id'];
    const hash = crypto.createHash('sha256');
    var hash_password = hash.update(datajson.opassword).digest('hex');
    if (datajson.password === datajson.cpassword) {
        console.log(datajson)
        db.Coach.findOne({
            where: {
                [Op.and]: { id: id, password: hash_password }
            }
        }).then((data) => {
            if (data === null) {
                res.send(data);
            } else {
                var hash2 = crypto.createHash('sha256');
                var newdata = { password: hash2.update(datajson.password).digest('hex') }
                db.Coach.update(newdata, { where: { id: id } }).then(() => {
                    res.redirect('/admin/login')
                })
            }
        })
    } else {
        res.redirect('/admin/account');
    }

});



module.exports = router;