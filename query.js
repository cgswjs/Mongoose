//this script can query database
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
  //find all persons objects from Person database
  Person.find(function(err,persons){
    if(err){
      console.log(err);
    }else{
      //close mongoose connection
      mongoose.connection.close(function(){
        console.log("Mongoose connection has been closed");
      })
      //log all data in the terminal
      console.log(persons);
      //use forEach to loop over all objects and log only names
      persons.forEach(function(person){
        console.log(person.name);
      });
    }
  });
});
