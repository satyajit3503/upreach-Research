const mongoose =require("mongoose");

// creating schema
const reviewerSchema = new mongoose.Schema({

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
    domain : {
        type :String,
        enum :['Healthcare','Technology','Cloud','Banking','Machine Learning','Robotics'],
        require:true
    },
    date: {
        type: Date,
        default: Date.now 
    },

})

//collection creation
const reviewerModal = mongoose.model("reviewer",reviewerSchema);

module.exports = reviewerModal;