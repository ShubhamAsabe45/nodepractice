const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes');
const db = require('./db'); // Ensure db.js is required to establish the connection

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the person routes
app.use('/persons', personRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
