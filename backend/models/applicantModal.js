const mongoose =require("mongoose");

// creating schema
const RegisterSchema = new mongoose.Schema({

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
    }
})


//models---->for crud operation
//collection creation
const applicant = mongoose.model("applicant",RegisterSchema);

module.exports = applicant;



