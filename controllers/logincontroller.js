const Controller = require('./controller');
const UserModel = require('../models/users');
const logger = require('../configuration/winston');

class loginController extends Controller
{
    constructor(req, res, next) 
    {
        super(req,res,next);
        logger.info("Iniciado Login");
    }

    login()
    {
        let username = this.req.body.uname;
        let contraseña = this.req.body.psw;
        let userModel = new UserModel();
        userModel.findUser(username,(info)=>{
            if (info.length === 0) {
                logger.debug("El usuario no existe");
                this.req.flash('info', 'El usuario no existe');
                this.index();
            } else {

                if (contraseña == info[0].password) {
                    this.index();

                } else {
                    this.req.flash('info', 'La contraseña es incorrecto');
                    this.index();
                }
            }

            })
    }

    index() {
        let info = this.req.flash('info');
        if (info == "") {
            console.log(" NO Existe info");
            this.res.render('login', {
                title: 'Login',
                layout: 'layout'
            });
        } else {
            console.log("Existe info");

            this.res.render('login', {
                title: 'Login',
                layout: 'layout',
                info: info
            });
            info = "";
        }
    }
}

module.exports = loginController;