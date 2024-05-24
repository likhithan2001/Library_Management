const mongoose = require("mongoose");

// function DbConnection() {
//     const DB_URL = process.env.MONGO_URI;

//     mongoose.connect(DB_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
// }

const DbConnection = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));

db.once("open", function() {
    console.log("DB connected !!")
})

module.exports = DbConnection;