var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var path = require('path');
import db from '../models';
const { Op } = require("sequelize");
router.use('/static', express.static(path.join(__dirname, 'public')));

router.get('/login', function(req, res) {
    res.render('admin/login');
});
router.post('/login', function(req, res) {
    var data = req.body;
    const hash = crypto.createHash('sha256');
    var hash_password = hash.update(data.password).digest('hex');
    db.Coach.findOne({
        raw: true,
        nest: true,
        where: {
            [Op.or]: [{ email: data.login, }, { username: data.login }],
            [Op.and]: {
                password: hash_password,
            }
        }
    }).then(function(resultat) {
        console.log(resultat);
        if (resultat === null) {
            res.redirect('/admin/login');
        } else {
            req.session.auth = true;
            req.session.user = resultat;
            res.redirect('/admin');
        }

    }).catch(function(err) {
        console.log(err)
        res.redirect('/admin/login');
    })
});

router.get('/', function(req, res) {
    req.session.active = "dashboard"
    db.Coach.findAll({
        include: [{
            model: db.Program,
            required: false,
            as: "programs",
            order: [
                ['date', 'DESC']
            ]
        }]
    }).then(function(resultat) {
        db.Student.findAll().then(function(resultat2) {
            db.Program.findAll({
                include: [{ model: db.Student, required: false, as: "presents" }],
                include: [{ model: db.Coach, required: false, as: "coachs" }],
                order: [
                    ['date', 'ASC'],
                ]
            }).then(function(resultat3) {
                db.Program.findAll({
                    where: {
                        category: req.session.user.category
                    },
                    include: [{ model: db.Student, required: false, as: "presents" }],
                    order: [
                        ['date', 'DESC'],
                    ],
                    limite: 2
                }).then((cprograms) => {
                    res.render('admin/index', { coachs: resultat, students: resultat2, programs: resultat3, cprograms: cprograms });
                })

            }).catch(function(err) {
                res.redirect('/admin/login');
            })
        }).catch(function(err) {
            res.redirect('/admin/login');
        })
    }).catch(function(err) {
        res.redirect('/admin/login');
    })
});
router.get('/logout', function(req, res) {
    req.session = null;
    res.redirect('admin/login');
});


module.exports = router;