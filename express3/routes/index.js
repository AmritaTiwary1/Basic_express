var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index')
});

//  CONNECT-FLASH
/*router.get('/login',function(req,res){
 // req.flash("koi v naam string me","koi v data type wala value");
 req.flash("age",21);
  res.send("creating flash in this route");
})

router.get('/access', function(req,res){
  console.log(req.flash("age"));
  res.send("accessing flash value of login route in this route")
})
  */

module.exports = router;
