const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.URL;
// const mongoURL = 'mongodb://localhost:27017/hotels';
// const mongoURL = 'mongodb+srv://shubs45:shubhamr@cluster0.bbl34hh.mongodb.net/';

const connectionParams ={
  useNewUrlParser :true,
  useUnifiedTopology: true
}

mongoose.connect(mongoURL)
  .then(()=>{ console.log('Connected to MongoDB server')})
  .catch((err) =>{console.log('MongoDB connection error',err)});



//   Get the default connection
const db = mongoose.connection;

// Event listners to database connection

db.on('connected',()=>{
    console.log('MongoDB connection sucessfull');
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

db.on('error',()=>{
    console.log('Connection error happened');
})


module.exports = db;