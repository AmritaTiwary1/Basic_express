const { name } = require('ejs');
const express = require('express');
const app = express();

//MIDDLEWARE
app.use((req,res,next)=>{
    console.log("middleware , this will run first, then after writing next() , another statement will run");
   next(); 
})

//ERROR ROUTE  
app.get('./error',(req,res)=>{
    throw error("Something went wrong")
})

//configure template engine
app.set("view engine","ejs"); 

 //configure public folder
app.use(express.static('./public')); 

//ROUTES
app.get('/',(req,res)=>{
    res.render("script",{name:''})
})

//ROUTE PARAMETER  (req.params)
app.get('/profile/:username',(req,res)=>{
    res.render('profile',{name:req.params.username})
})

//ERROR HANDLING (make error.ejs)
app.use(function errorhandler(err,req,res,next){ //err is message inside throw message =>Something went wrong
    if(res.headersSent){
       return next(err) 
    } 
    res.status(500)
    res.render('error',{error:err})  // error is ejs file where we send err(Something went wrong) 
})



app.listen(3000);