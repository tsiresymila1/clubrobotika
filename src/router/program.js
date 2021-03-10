var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var path = require('path');
import db from '../models';
const { Op } = require("sequelize");


router.get('/', function(req, res) {
    req.session.active = "program"
    res.render('admin/program/index');
});

router.get('/pdf', function(req, res) {
    res.render('admin/program/pdf');
});
router.get('/update', function(req, res) {

});



module.exports = router;