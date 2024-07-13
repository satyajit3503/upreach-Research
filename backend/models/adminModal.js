const mongoose =require("mongoose");

// creating schema
const adminSchema = new mongoose.Schema({

    crn : {
        type: String,
        required : true
    },
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        require : true
    },
    password : {
        type: String,
        require : true
    
    },
    date: {
        type: Date,
        default: Date.now 
    },
   

})

//collection creation
const adminModal = mongoose.model("admin",adminSchema);

module.exports = adminModal;