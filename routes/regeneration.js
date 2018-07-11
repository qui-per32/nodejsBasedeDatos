const express = require('express');
const Router = express.Router();
const IdentificationService = require('../service/identificationService');
const SecureService = require('../service/secureService');

Router.get('/hash/:hash',(req,res,next)=>{
    console.log('entrado en regeneration ->' + req.params.hash);

res.send(200);

});

Router.get('/uid',(req,res,next)=>{
    let identificationService = new IdentificationService;
    console.log('consigo el uid=>' + identificationService.getUUIDD(1,3));
    
    res.send(200).json()
});


Router.get('/encrypt/:pass', (req,res,next)=>{
 let pass = req.params.pass;
 let secureService = new SecureService();
 let encryptpass = secureService.encryptPass(pass)
 console.log("Pass encriptada ->" + encryptpass);
 console.log("Pass : " + pass + " Pass Encrypt: " + 
 encryptpass + secureService.comparePass(pass, encryptpass));
});


module.exports = Router;