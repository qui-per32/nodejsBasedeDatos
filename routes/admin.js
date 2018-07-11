const Express = require('express');
const Router = Express.Router();


Router.get('/',(req,res,next)=> {
    res.status(200).json(req.session.isAdmin || "La sesion no creada");
})

Router.get('/create', (req,res,next)=> {
    req.session.username="quique";
    req.session.isAdmin = true;
    res.redirect('/admin');
})

Router.get('/remove', (req,res,next)=>{
    req.session.username=null;
    res.redirect('/admin');
})

Router.get('/destroy', (req,res,next)=> {
    req.session.destroy();
    res.redirect('/admin');
})


module.exports = Router;