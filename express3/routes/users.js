const mongoose=require('mongoose'); 

mongoose.connect("mongodb://127.0.0.1:27017/express3db")

const userShema = mongoose.Schema({
  username:String,
  nickname:String,
  description:String,
  categories:{ //we can write any name instead of categories
    type:Array,
    default:[]
},
 datecreated:{
  type:Date,
  default:Date.now() 
 }
  })

 module.exports= mongoose.model("user",userShema);

