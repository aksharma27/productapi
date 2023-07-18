const mongoose = require('mongoose');

const connectDb = async() => {
    try {
         const conn = await mongoose.connect("mongodb+srv://aksharma27:Abhishek02@cluster0.gykbdzo.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser:true,
            useUnifiedTopology:true,
         });
         console.log("Db connected " + conn.connection.host);
    } catch (error) {
        console.log(`Error : ${error.message}`);
    }
};

module.exports = connectDb;