const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const connectToDB = ()=>{
     const connection = mongoose.connect(`${MONGO_URI}/media_store`)
     return connection
}


module.exports = connectToDB