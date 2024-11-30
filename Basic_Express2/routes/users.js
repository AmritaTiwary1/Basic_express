//install mongoosejs
//require and setup connection
//make schema
//create model and export


const mongoose = require('mongoose');  

mongoose.connect('mongodb://127.0.0.1:27017/sampleDatabase');


//making schema so that we can use it in mode(collection)

const userSchema = mongoose.Schema({
    username:String,
    name:String,
    age:Number
})

module.exports = mongoose.model("user",userSchema); //user is name of the collecton in db & it should be written inside inverted comma,here schema is userSchema
 

//Another way ---

// const mongoose=require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/flipkart')

// module.exports = mongoose.model("Product", mongoose.Schema({
//     productId:Number,
//     productName:String, 
//     productPrice:Number
// }))



