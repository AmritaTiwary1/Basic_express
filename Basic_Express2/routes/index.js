var express = require('express');
var router = express.Router();
const userModel = require('./users');  //importing model from user.js where we have exported

/* GET home page */
router.get('/', function(req,res, next) {
 res.render('index');
});

// *************    SESSION  **************
/* router.get('/login',function(req,res){
  //req.session.anyName = "Anything_eg.-saveYourUsername_Password"  //this is unique for each user , that means , if I write -- session = username, then each user's username will be store in server for his/her computer, and req.session can be accessed from any router, lets take an eg.-- if a user sign up in a website, then we can store that info in server(req.session.login=true), now when that user will again open website, we will fetch data for that particular system (whether login or not) in '/' route, and then according to that, we will show that page(if login - home/about/contact/service/logout  && if not login - home/login/signup)
  res.render('login');
  req.session.login =true;
})

// ****** Accessing Session from differnt route ******

router.get('/checksession', function(req,res){
   //  console.log(req.session.anyName);
   if(req.session.login === true){
       res.render('home');  //we have not made home or login page yet, it is just a example
    }
    else{
      res.render('login');  //show login page to user
   }
});

// ***** deleting session --- when we restart the server (write npx nodemon/ or make changes in code), then session get deleted, and when we again go to login route, session.login will be made
 
router.get('/logout',function(req,res){
 res.render('logout');
 req.session.destroy(function(err){
  if(err){
  throw err;
 }}
)});

// *********************** COOKIE *****************

router.get('/sendcookie', function(req,res){
 res.cookies("age",21);
 res.render("index");
});

router.get('/read', function(req,res){
console.log(req.cookies) // --> age:21  here, we have written req bcoz we are reading cookies from browser to thr server
 console.log(req.cookies.age)  ---> 21
res.send("COOKIES READ"); 
})

//when we delete cookies, and want to access it,will get undefined
router.get('/delete' , function(req,res){
res.clearCookie(age);
res.send("age cookie deleted");
})



*/
//TO CREATE DOCUMENT IN COLLECTION(userModel) OF DATABASE 

// i comment it out bcoz if we restart our website on localhost , it will again create  router.get("/create", async function (req,res){  //since we know that js is asynchronous(no line by line execution ,if one line takes more time,next line will get executed) ,thatswhy we have to use await keyword to tell js to first complete create processs & then to run next line of code, but for that we have to use async keyword in the parent function (Rule)
router.get('/create',async function(req,res){
const createdUser = await userModel.create({  //create fn returns something, so to store it ,we used createduser
    username:"dev3",
    age:27, 
    name:"dev"
  }); 
  res.send(createdUser); 

});

// output of create router ---
// {
//   "username": "dev3", 
//   "name": "dev",
//   "age": 25,
//   "_id": "6728487abc6c22ee9721dd1d",
//   "__v": 0
// }

//TO FIND THE DOCUMENT IN COLLECTON --

//making another documet so that find method can show all users info

/* router.get("/createMore", async function (req,res){  //since we know that js is asynchronous(no line by line execution ,if one line takes more time,next line will get executed) ,thatswhy we have to use await keyword to tell js to first complete create processs & then to run next line of code, but for that we have to use async keyword in the parent function (Rule)
   const createdUser = await userModel.create({  //create fn returns something, so to store it ,we used createduser
       username:"radha",
       age:7,
       name:"radhe"
     });
     res.send(createdUser); 
  
   });  //i comment it out bcoz if we restart our website on localhost , it will again create that 
*/
  //find method return all the documents in collection/model

router.get('/allusers',async function(req,res){
 let allusers = await userModel.find();
 res.send(allusers);
})

//to find single user/document from collection using findOne & we have to pass object inside findone

router.get('/oneuser',async function(req,res){
  let oneuser = await userModel.findOne({username:"radha"});
  res.send(oneuser)
}) 

//to find and delete document --
router.get('/delete',async function(req,res){
  let deleteduser = await userModel.findOneAndDelete({username:"dev3"});  //it delete one document at a time,if multiple documents are present with same username , we have to run delete operation multiple times
  res.send(deleteduser);
})
 
module.exports = router; 


