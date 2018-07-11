const Express = require('express');
const Router = Express.Router();


Router.get('/',(req,res,next)=> {
    res.send(req.flash('info'));
})

Router.get('/create',(req,res,next)=>{
    req.flash('info', 'Sesion flash creada');
    res.redirect('/login-flash');
})

module.exports = Router;