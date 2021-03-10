var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var path = require('path');
import db from '../models';
const { Op } = require("sequelize");


router.get('/', function(req, res) {
    req.session.active = "program";
    db.Program.findAll({raw:true,nest:true,include:[
       { 
           model:db.File,
           as : "files",
           
        }
    ]}).then(function(data){
        console.log(data)
        db.File.findAll({raw:true,nest:true}).then(function(files){
             res.render('admin/program/index',{programs:data ,files : files});
         }).catch(function(error){
             res.status(500).send(error);
         })
    }).catch(function(error){
        res.status(500).send(error);
    })
});

router.get('/pdf', function(req, res) {
    res.render('admin/program/pdf');
});
router.post('/add', function(req, res) {
    var jsondata = req.body ;
    db.Program.create(jsondata).then(function(indice){
        res.redirect('/admin/program')
    }).catch(function(err){
        res.status(500).send(err);
    })

});

router.post('/file/add', function(req, res) {
    var jsondata = req.body ;
    db.Program.findByPk(jsondata.id).then(async (program) =>{
        console.log(jsondata.files)
        if(typeof(jsondata.files) === typeof([])){
            var increment = 0;
            jsondata.files.forEach(function(el,index,array){
                increment++ ;
                db.File.findByPk(el).then(function(file){
                    program.setFiles([file]).then(function(indice){
                        if(increment === array.length){
                            res.redirect('/admin/program')
                        }
                    })
                });
            })
        }
        else{
            var file =  await db.File.findByPk(jsondata.files)
            program.setFiles([file]).then(function(indice){
                res.redirect('/admin/program')
            })
        }
    })
    
    
    // db.Program.create(jsondata).then(function(indice){
    //     
    // }).catch(function(err){
    //     res.status(500).send(err);
    // })

});

router.get('/update', function(req, res) {

});



module.exports = router;