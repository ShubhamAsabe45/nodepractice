const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    // First check the request header has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error:'token not found'})
    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // Attach user information to the request object
        req.user = decoded;
        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Invalid token' });

    }
}

// Function to generate token

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
}

// Export
module.exports = {jwtAuthMiddleware,generateToken}