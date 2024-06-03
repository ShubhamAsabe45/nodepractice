const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes');
const db = require('./db'); // Ensure db.js is required to establish the connection
require('dotenv').config();
const passport = require('./auth')


// Middleware to parse JSON bodies
app.use(bodyParser.json());


// Middleware function

const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.listen}`);
    next();
};

app.use(logRequest);


passport.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});
app.get('/', localAuthMiddleware,function (req,res){
    res.send('Welcome to our hotel')
})

// Use the person routes
// app.use('/persons', localAuthMiddleware, personRoutes);
app.use('/persons', personRoutes);


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
