require('dotenv').config()
const mongoose = require('mongoose');

const server = process.env.REACT_APP_server;
const database = process.env.REACT_APP_database;

const mongoURI = `mongodb://${server}/${database}?directConnection=true&readPreference=primary`;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, ()=>{
        console.log("Connected to mongo successfully");
    })
    } catch (error) {
        console.log("Failed to connect to MongoDB", error)
    }
    
}

module.exports = connectToMongo;