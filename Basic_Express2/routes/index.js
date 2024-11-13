var express = require('express');
var router = express.Router();
const userModel = require('./users');  //importing model from user.js where we have exported

/* GET home page. */
router.get('/', function(req,res, next) {
  res.render('index');
  //res.send("hi")
});

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


