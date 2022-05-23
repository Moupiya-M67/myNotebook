const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false";
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo successfully!")
    })
}
module.exports = connectToMongo;

//Code before :
//const mongoURI = "mongodb://localhost:27017/iNotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"