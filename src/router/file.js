var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var path = require('path');
const { uuid } = require('uuidv4');

import db from '../models';
const { Op } = require("sequelize");


router.get('/', function(req, res) {
    req.session.active = "document";
    db.File.findAll({raw:true,nest:true}).then(function(data){
        console.log(data)
        res.render('admin/document/index',{files:data});
    }).catch(function(error){
        res.status(500).send(error);
    })
});


router.post('/add', function(req, res) {
    var file = req.files.file;
    var uploadPath = __dirname + '/../public/document/';
    var itemsProcessed = 0;
    var extension = file.name.split('.').slice(-1)[0];
    var newname = uuid()+'.'+extension ;
    itemsProcessed++;
    file.mv(uploadPath+newname,function(err){
        if(err) return ;
        var jsondata = {
            type : file.mimetype,
            name: newname,
            size: file.size,
            securename : req.body.securename
        }
        db.File.create(jsondata).then(function(indice){
            res.redirect('/admin/document')
        }).catch(function(err){
            res.status(500).send(err);
        })
    });
    


});
router.post('/delete', function(req, res) {
    db.File.destroy({
        where: { id: req.body.id }
    }).then((rep) => {
        res.redirect('/admin/document');
    }).catch((error) => {
        return res.status(500).send(error);
    });
});



module.exports = router;