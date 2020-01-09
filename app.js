//this script create and insert data to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/personDB', {useNewUrlParser: true,useUnifiedTopology:true});

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
  console.log('we are connected');
  //create a schema in mongoose to specify types for data
  const personSchema = new mongoose.Schema({
    name:{
      type:String,
      require:[true,"Name is required information"]
    },
    major:{
      type:String,
      default:"N/A"
    },
    age:{
      //use object to add validors
      //these validators can validate the input data satisfy the requirements
      type:Number,
      min:1,
    },
    hobby:String
  });

  //create collection model
  const Person = mongoose.model("person",personSchema);

  // person.save();
  const person1 = new Person({
    name:"Jiani Ye",
    major:"CS",
    age:28,
    hobby:"ski"
    });
  const person2 = new Person(
    {
      name:"Yi Huang",
      major:"N/A",
      age:55,
      hobby:"music"
    });
  const person3 = new Person(
    {
      name:"Yanshan Chen",
      major:"CE",
      age:58,
      hobby:"mahjo"
    });

    Person.insertMany([person1,person2,person3],function(err){
      if(err){
        console.log(err);
      }else{

        console.log('Successfully inserted data');
        mongoose.connection.close(function(){
        console.log("Insertion done and connection has been closed");
        });
      };
    });
});
