var express = require('express');
var router = express.Router();
const userModel = require('./users');  //importing model from user.js where we have exported  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  //res.send("hi")
});

router.get("/create")

module.exports = router;
