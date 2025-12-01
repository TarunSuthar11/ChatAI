const { mongoose } = require("mongoose");

const mongoConnect = async () => {
    try{
        const mongoResponse = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected 🤗");
        
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = mongoConnect;