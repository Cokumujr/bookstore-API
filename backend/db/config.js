const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/bookstore_MERN"

const connect_db = async() => {
    await mongoose.connect(connectionString).then(() => console.log("Database Connected Successfully!!"))
}

module.exports.connect_db = connect_db;