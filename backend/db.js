const mongoose = require('mongoose');

const server = 'localhost:27017';
const database = 'AllYouNeedNotebook';

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