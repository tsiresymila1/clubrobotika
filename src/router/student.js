var express = require('express')
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    res.render('admin/student',);
});
router.get('/add', function(req, res) {
    res.render('admin/student_add');
});

module.exports = router;