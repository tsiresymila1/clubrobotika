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
    console.log(data)
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
        if (resultat === null) {
            res.redirect('/admin/login');
        } else {
            req.session.auth = true;
            req.session.user = resultat;
            res.redirect('/admin');
        }

    }).catch(function(err) {
        res.redirect('/admin/login');
    })
});

router.get('/', function(req, res) {
    req.session.active = "dashboard"
    db.Coach.count().then(function(resultat) {
        db.Student.count().then(function(resultat2) {
            db.Program.count().then(function(resultat3) {
                res.render('admin/index', { coach: resultat, student: resultat2, program: resultat3 });
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