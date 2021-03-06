var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login', (req, res, next) => {
  let loginController = new loginController(req, res, next);
  loginController.login();
})

module.exports = router;
