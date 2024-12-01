var express = require('express');
var router = express.Router();
const userModel = require('./users');  //importing model

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index')
});

router.get('/create',async function(req,res){
 // creating multiple users one by one by commenting out previous document info
 
 /* const userdata = await userModel.create({
    username:"dev",
    nickname:"ved",
    description:"i am happy from inside and outside",
    categories:['js','node','react','mongodb','express'],
  })*/

  /* const userdata = await userModel.create({
    username:"deva",
    nickname:"aved",
    description:"i am happy",
    categories:['life','hapiness','yoga'],   
  }) */

 /* const userdata = await userModel.create({
    username:"radha",
    nickname:"radhe",
    description:"full of joy and happiness",
    categories:['real joy','content']
  }) */

  /*  const userdata = await userModel.create({
    username:"suru",
    nickname:"ruchi",
    description:"i am happy",
    categories:['js','java','yoga'],   
  }) */

  /*const userdata = await userModel.create({
    username:"amrita",
    nickname:"ami",
    description:"i am happy",
    categories:['js','java','node','mongodb','yoga','content'],   
  }) */

  res.send(userdata)
})

    /***** SHOWING ALL DOCUMENTS OF THIS USERMODEL ******/
    router.get('/allDocument',async function(req,res){
      const allusers = await userModel.find();
      res.send(allusers);
    })
    
// ************************************************************************

// ********* 1. How can i perform a case-insensitive search in Mongoose? 

// router.get('/find',async function(req,res){
//  let user= await userModel.find({username:"radha"});
//  res.send(user);  //getting correct document
// })

//what if we type Radha instead of radha
// router.get('/find',async function(req,res){
//  let user= await userModel.find({username:"Radha"});
//  res.send(user);    //--> [] , output is empty
// })

//How to remove case insensitivity with RegExp (if we write Radha and one username is radharani, then that document will also be visible)
// router.get('/find',async function(req,res){
//   const regex = new RegExp("Radh",'i');
//   let user= await userModel.find({username:regex});  
//   res.send(user)  //op -- radha document
// })

//2nd way : How to remove case insensitivity

// ^xyz => it means starting me aisa jrur hona chahiye
// xyz$ => it means if word have xyz at the end,show it (eg. hoxyz[yes] , xyzha[no]) 
// ^xyz$ => it means word should exactly contain xyz in capital/small/mix

// router.get('/find',async function(req,res){
//   let regex= new RegExp("^Radh$","i");
//    let user= await userModel.find({username:regex});

//  // let user= await userModel.find({username:/^Radh$/i});
//   res.send(user) //no doc
// })

// router.get('/find',async function(req,res){
//   let user= await userModel.find({username:/^Radh/i});
//   res.send(user) //radha doc
// })

router.get('/findone',async function(req,res){
// let regex= new RegExp("^RadhA$","i");
// let user= await userModel.find({username:regex}); //radha doc

let user= await userModel.find({username:/A$/i});  //i means insensitive , g means global
  res.send(user) //radha,deva,amrita docs bcoz here i have $ means at the end, i want "a"
})

// ***************************************************************************************

// 2. How do i find documents where array field contains all of a set of values?

/*router.get('/findtwo', async function(req,res){
  let data = await userModel.find({categories:{$all:['js']}})
    res.send(data); //--> dev,suru,amrita doc.
})*/

/*router.get('/findtwo', async function(req,res){
  let data = await userModel.find({categories:'js'}) //{categories:['js']} -->gives null(empty) value
  res.send(data); //--> op- suru,dev,amrita
})*/

/*router.get('/findtwo', async function(req,res){
  let data = await userModel.find({categories:['js','java']}) 
  res.send(data); //--> op- empty 
})*/

//use of $all ensures that only those documents that have both of these values in the categories array will 
//bereturned.If a document has either one of values but not both,it will not be included in results

router.get('/findtwo', async function(req,res){
  let data = await userModel.find({categories:{$all:['js','java']}}) 
  res.send(data); //--> suru,amrita bcoz these two have js and java both unlike dev which has only js
})

//**************************************************************************************************
// 3. How do i find documents with a specific date range in mongoose?

//if we have to put some condition like all,gte(>=),lte(<=),we write $ before it, gte-greater than equal to , lte - less than equal to

/*router.get('/findthree',async function(req,res){
  let date1 = new Date('2024-11-29'); //'yyyy-mm-dd' 
  let date2 = new Date('2024-12-01');
  let data = await userModel.find({datecreated:{$gte:date1, $lte:date2}}); 
  res.send(data); //-- dev,deva,radha,
})*/

router.get('/findthree',async function(req,res){
  let date1 = new Date('2024-11-29'); //'yyyy-mm-dd' 
  let data = await userModel.find({datecreated:{$gte:date1}}); 
  res.send(data); //-- dev,deva,radha,suru,amrita
})

//************************************************************
//4. How can I filter documents based on existence of field in mongoose?
//it means if categories field exist in this model,then return all docs and lets say in a usermodel,we want to find whether address and phone no. is present or not, then we can use $exists:true 

router.get('/findfour',async function(req,res){
  let data = await userModel.find({categories:{$exists: true}})
  res.send(data); //--> dev,deva,radha,suru,amrita
})

/********************************************************************/
//5. How can I filter documents based on specific field's length in mongoose?

router.get('/findfive',async function(req,res){
  let data = await userModel.find({
    $expr:{   //--- expression
      $and:[ //--and means both consitions are compulsory
        {$gte:[{$strLenCP:"$nickname"}, 0]},   //gte - greater than equal & strLenCP-string length compare
        {$lte:[{$strLenCP:"$nickname"}, 3]}
     ]}
  })
res.send(data);
})

module.exports = router; 
