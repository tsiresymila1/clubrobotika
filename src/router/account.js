var express = require('express')
import QRCode from 'qrcode';
const crypto = require('crypto');
var router = express.Router();
import db from "../models";
import badgeCreator from '../core/pdf';


router.get('/', function(req, res) {
    db.Coach.findAll({ raw: true, nest: true, }).then((data) => {
        res.render('admin/coach/account', { coachs: data ,superadmin: req.session.login === "superadmin"});
    }).catch((error) => {
        res.status(500).send(error);
    });
});

router.get('/add', function(req, res) {
    res.render('admin/coach/index',{superadmin: req.session.login === "superadmin"});
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
                res.redirect('/coach');
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
            res.redirect('/coach');
        }).catch((error) => {
            console.log('Error');
            res.send(error).status(500);
        });
    }
});



module.exports = router;