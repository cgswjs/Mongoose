//this script can be used to delete one or many from the collection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/personDB', {useNewUrlParser: true,useUnifiedTopology:true});

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
  console.log('we are connected');
  //create a schema in mongoose to specify types for data
  const personSchema = new mongoose.Schema({
    name:String,
    major:String,
    age:Number,
    hobby:String
  });

//create collection model
const Person = mongoose.model("person",personSchema);

//delete function that deletes one data object from the collection
Person.deleteOne({name:"Yanshan Chen"},function(err){
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close(function(){
      console.log("Mongoose connection has been closed");
    })
    console.log("successfully deleted data");
  };
});

//detele many function
Person.deleteMany({name:"Yihan Chen"},function(err){
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close(function(){
      console.log("Mongoose connection has been closed");
    })
    console.log("successfully deleted all objects");
  };
});
