const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels'

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