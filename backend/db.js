require('dotenv').config()
const mongoose = require('mongoose');

const username = process.env.REACT_APP_DB_USERNAME;
const password = process.env.REACT_APP_DB_PASSWORD;
const clusterName = process.env.REACT_APP_DB_CLUSTERNAME;
const databaseName = process.env.REACT_APP_DB_DATABASENAME;

const mongoURI = `mongodb+srv://${username}:${password}@${clusterName}.egn05zd.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const connectToMongo = async () => {
    try {
      const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      };
      const mongooseConnection = await mongoose.connect(mongoURI, mongooseOptions);
      console.log('Connected to MongoDB Atlas successfully');
      return mongooseConnection;
    } catch (error) {
      console.log('Failed to connect to MongoDB Atlas', error);
      process.exit(1);
    }
  };
  
  module.exports = connectToMongo;
