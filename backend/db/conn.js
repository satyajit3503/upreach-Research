const mongoose =require('mongoose');


const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://satyajitsahu042:Jeet2024@upreach.gypzvvb.mongodb.net/?retryWrites=true&w=majority&appName=upreach")
    .then(()=> console.log("Database connected")
    ).catch((err)=>console.log("eror",err));
}
connectDB();

//_id
// 6630e79c0942bae613affe17
// 
// ""
// 
// "publisher"
// email
// "publisher@email.com"
// password
// "publisher"
// date
// "2024-04-30T09:56:00.115+00:00"