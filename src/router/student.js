var express = require('express')
var router = express.Router();
var db = require('./../models');

router.get('/', function(req, res) {
    req.session.active = "student"
    if (req.query.category != undefined) {
        db.Student.findAll({
            where: {
                category: req.query.category
            },
            include: [{ model: db.Program, required: false, as: "presents" }],
            order: [
                ['name', 'ASC'],
                ['lastname', 'ASC']
            ]
        }).then((data) => {
            console.log(data);
            res.render('admin/student/index', { students: data });
        })
    } else {
        db.Student.findAll({
            include: [{ model: db.Program, required: false, as: "presents" }],
            order: [
                ['name', 'ASC'],
                ['lastname', 'ASC']
            ]
        }).then((data) => {
            console.log(data);
            res.render('admin/student/index', { students: data });
        })
    }

});
router.get('/add', function(req, res) {
    req.session.active = "student"
    res.render('admin/student/add');
});

router.post('/add', function(req, res) {
    var imagefile = req.files.file;
    var uploadPath = __dirname + '/../public/assets/profile/students/' + imagefile.name;

    imagefile.mv(uploadPath, function(err) {
        if (err) return res.status(500).send(err);
        var datajson = req.body;
        delete datajson['file']
        datajson['image'] = imagefile.name;
        // datajson['role'] = 'superadmin';
        db.Student.create(datajson).then((rep) => {
            res.redirect('/admin/student');
        }).catch((error) => {
            return res.status(500).send(error);
        });

    });
});
router.get('/edit/:id', function(req, res) {
    req.session.active = "student"
    db.Student.findOne({ where: { id: req.params.id } }).then((data) => {
        console.log(data)
        if (data === null) {
            res.redirect('/admin/student')
        } else {
            res.render('admin/student/edit', { student: data });
        }
    }).catch((error) => {
        res.status(500).send(error);
    });
});

router.post('/edit', function(req, res) {
    var imagefile = req.files;
    var datajson = req.body;
    if (imagefile != null) {
        var uploadPath = __dirname + '/../public/assets/profile/students/' + imagefile.file.name;
        imagefile.file.mv(uploadPath, function(err) {
            if (err) return res.status(500).send(err);
            var datajson = req.body;
            delete datajson['file']
            datajson['image'] = imagefile.file.name;
            var id = datajson.id;
            delete datajson['id']
            db.Student.update(datajson, { where: { id: id } }).then(() => {
                console.log('Updated')
                res.redirect('/admin/student');
            }).catch((error) => {
                console.log('Error');
                res.send(error).status(500);
            })

        });
    } else {
        var id = datajson.id;
        delete datajson['id'];
        db.Student.update(datajson, { where: { id: id } }).then(() => {
            console.log('Updated')
            res.redirect('/admin/student');
        }).catch((error) => {
            console.log('Error');
            res.send(error).status(500);
        });
    }
});

router.post('/excel', function(req, res) {
    var excelfile = req.files;
    var uploadPath = __dirname + '/../public/assets/profile/students/' + excelfile.file.name;
    excelfile.file.mv(uploadPath, function(err) {

    });
});

router.post('/delete', function(req, res) {
    db.Student.destroy({
        where: { id: req.body.id }
    }).then((rep) => {
        res.redirect('/admin/student');
    }).catch((error) => {
        return res.status(500).send(error);
    });
});

module.exports = router;