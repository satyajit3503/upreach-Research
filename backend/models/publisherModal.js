const mongoose =require("mongoose");

// creating schema
const publisherSchema = new mongoose.Schema({

    crn : {
        type: String,
        // required : true
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
const publisherModal = mongoose.model("publisher",publisherSchema);

module.exports = publisherModal;