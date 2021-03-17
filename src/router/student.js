var express = require('express')
var router = express.Router();
var db = require('./../models');
var XLSX = require('xlsx');
const { uuid } = require('uuidv4');
import { Op } from 'sequelize';

router.get('/', function(req, res) {
    req.session.active = "student"
    var whereclose = {};
    if (req.session.user.role != "admin" && req.session.user.role != "superadmin") {
        whereclose = {
            category: req.session.user.category
        }
    }
    db.Student.findAll({
        where: whereclose,
        include: [{ model: db.Program, required: false, as: "presences" }],
        order: [
            ['name', 'ASC'],
            ['lastname', 'ASC']
        ]
    }).then((data) => {
        res.render('admin/student/index', { students: data });
    })

});
router.get('/add', function(req, res) {
    req.session.active = "student"
    res.render('admin/student/add');
});

router.post('/add', function(req, res) {
    var imagefile = req.files;
    var datajson = req.body;
    if (imagefile != null) {
        var uploadPath = __dirname + '/../public/assets/profile/students/' + imagefile.file.name;
        imagefile.file.mv(uploadPath, function(err) {
            if (err) return res.status(500).send(err);
            delete datajson['file']
            datajson['image'] = imagefile.name;
            // datajson['role'] = 'superadmin';
            db.Student.create(datajson).then((rep) => {
                res.redirect('/admin/student');
            }).catch((error) => {
                return res.status(500).send(error);
            });

        });
    } else {
        db.Student.create(datajson).then(() => {
            res.redirect('/admin/student');
        }).catch((error) => {
            console.log('Error');
            res.send(error).status(500);
        });
    }


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
    var extension = excelfile.file.name.split('.').slice(-1)[0];
    var newname = uuid() + '.' + extension;
    var uploadPath = __dirname + '/../public/assets/profile/students/' + newname;
    excelfile.file.mv(uploadPath, function(err) {
        var workbook = XLSX.readFile(uploadPath);
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        var jsondata = XLSX.utils.sheet_to_json(worksheet)
        db.Student.bulkCreate(jsondata).then((resp) => {
            console.log(jsondata);
            res.redirect('/admin/student');
        })
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

router.get('/search', function(req, res) {
    res.redirect('/admin/student')
})

router.post('/search', function(req, res) {
    var query = req.body.search;
    db.Student.findAll({
        where: {
            [Op.or]: {
                name: {
                    [Op.like]: "%" + query + "%"
                },
                lastname: {
                    [Op.like]: "%" + query + "%"
                },
                matricule: {
                    [Op.like]: "%" + query + "%"
                }
            }
        },
        include: [{ model: db.Program, required: false, as: "presents" }],
        order: [
            ['name', 'ASC'],
            ['lastname', 'ASC']
        ]
    }).then((data) => {
        res.render('admin/student/index', { students: data });;
    }).catch((error) => {
        return res.status(500).send(error);
    });
});

module.exports = router;