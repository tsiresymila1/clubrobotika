var express = require('express')
import QRCode from 'qrcode';
const crypto = require('crypto');
var router = express.Router();
import db from "../models";
import badgeCreator from '../core/pdf';


router.get('/', function(req, res) {
    req.session.active = "coach";
    db.Coach.findAll({ raw: true, nest: true, }).then((data) => {
        res.render('admin/coach/index', { coachs: data, superadmin: req.session.login === "superadmin" });
    }).catch((error) => {
        res.status(500).send(error);
    });
});
router.get('/add', function(req, res) {
    req.session.active = "coach";
    res.render('admin/coach/index', { superadmin: req.session.login === "superadmin" });
});

router.get('/badge/:id', function(req, res) {
    req.session.active = "coach";
    db.Coach.findOne({ where: { id: req.params.id }, raw: true, nest: true }).then((coach) => {
        var qrfile = __dirname + '/../public/assets/qrcode.png';
        QRCode.toFile(qrfile, coach.matricule, {
            color: {
                darkk: "#00F",
                light: "#fff"
            },
            version: 5
        }, function(error) {
            if (error) res.status(500).send(error);
            badgeCreator(res, coach, qrfile);
        });
    }).catch((error) => {
        console.log('Here e1')
        res.status(500).send(error);
    });

});

router.post('/add', function(req, res) {
    var imagefile = req.files.file;
    var uploadPath = __dirname + '/../public/assets/profile/' + imagefile.name;

    imagefile.mv(uploadPath, function(err) {
        if (err) return res.status(500).send(err);
        var datajson = req.body;
        const hash = crypto.createHash('sha256');
        var hash_password = hash.update(datajson.password).digest('hex')
        delete datajson['file']
        datajson['image'] = imagefile.name;
        datajson['password'] = hash_password;
        // datajson['role'] = 'superadmin';
        db.Coach.create(datajson).then((rep) => {
            res.redirect('/admin/coach');
        }).catch((error) => {
            return res.status(500).send(error);
        });

    });
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
            delete datajson['id']
            db.Coach.update(datajson, { where: { id: id } }).then(() => {
                console.log('Updated')
                res.redirect('/admin/coach');
            }).catch((error) => {
                console.log('Error');
                res.send(error).status(500);
            })

        });
    } else {
        var id = datajson.id;
        delete datajson['id'];
        db.Coach.update(datajson, { where: { id: id } }).then(() => {
            console.log('Updated')
            res.redirect('/admin/coach');
        }).catch((error) => {
            console.log('Error');
            res.send(error).status(500);
        });
    }
});

router.post('/delete', function(req, res) {
    db.Coach.destroy({
        where: { id: req.body.id }
    }).then((rep) => {
        res.redirect('/admin/coach');
    }).catch((error) => {
        return res.status(500).send(error);
    });
});


module.exports = router;