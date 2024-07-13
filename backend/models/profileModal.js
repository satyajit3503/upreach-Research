const mongoose =require('mongoose');

//creating schema

const profileSchema= new mongoose.Schema({
    name:
    {
        type :String
    },
    phone:
    {
        type :Number
    },
    email:{
        type :String
    },
    address:{
        type:String
    },
    country :{
        type :String
    },
    state:{
        type:String
    },
    zip:{
        type:Number
    },
    gender:{
        type:String,
        enum :['male','female','others']
    },
    file:{
        type:String    //you can store the name of that file
    },
    about:{
        type:String
    },
});

//creating model /collection

const profile=mongoose.model('profile' ,profileSchema)
module.exports=profile;
