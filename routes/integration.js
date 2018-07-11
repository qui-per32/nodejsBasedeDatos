const Express = require('express');
const Router = Express.Router();
const LoginController = require('../controllers/logincontroller');
const UserModel = require('../models/users');
const Email = require('../configuration/emailConf');
const Path = require('path');
const hbsEmail = require('nodemailer-express-handlebars');


Router.get('/', (req, res, next) => {
    res.send(200).json("integration");
})

Router.get('/login', (req, res, next) => {
    let loginController = new LoginController(req, res, next);
    loginController.index();
})

Router.post('/login', (req, res, next) => {
    let loginController = new LoginController(req, res, next);
    loginController.login();
})

Router.get('/email', (req, res, next) => {

    Email.transporter.use('compile', hbsEmail ({
        viewEngine: 'hbs',
        extName: '.hbs',
        viewPath: Path.join(__dirname,'../views/emails')
    }));

    let message = {
        to: 'perezgonz32@gmail.com',
        subject: 'Email de prueba',
        template: 'email',
        context:{
            text:'enviamos una prueba por handblears'
        },
        attachments: [{
                filname: 'sdai_snow.jpg',
                path: __dirname + '/../public/images/sdai_snow.jpg',
                cid: 'image'
            }

        ]
    };
    Email.transporter.sendMail(message, (error, info) => {
        if (error) {
            res.status(500).send(error, message);
            return
        }
        Email.transporter.close();
        res.status(200).send('Respuesta "%s"' + info.response);
    });
});


module.exports = Router;