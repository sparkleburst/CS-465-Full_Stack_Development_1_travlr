const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");

// Log the JWT secret key
console.log('JWT Secret Key:', process.env.JWT_SECRET);

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ["HS256"]
});

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

// Middleware function to extract user information from JWT token
const extractUserFromToken = (req, res, next) => {
    // Access the decoded token from req.payload
    const decodedToken = req.payload;

    console.log('Decoded Token:', decodedToken); // Log the decoded token

    if (decodedToken) {
        // Extract user information from the decoded token and attach it to the request object
        req.user = decodedToken;
        next(); // Move to the next middleware or route handler
    } else {
        // If no token is provided or the token is invalid, set req.user to null or handle the absence of authentication
        req.user = null;
        next(); // Move to the next middleware or route handler
    }
};

// Debugging middleware to log request headers
const logHeaders = (req, res, next) => {
    console.log('Request Headers:', req.headers);
    next();
};

// Debugging middleware to log extracted token
const logToken = (req, res, next) => {
    console.log('Token:', req.headers.authorization);
    next();
};

// Debugging middleware to log decoded token
const logDecodedToken = (req, res, next) => {
    console.log('Decoded Token:', req.payload);
    next();
};

// Apply the middleware to extract user information from JWT token
router.use(extractUserFromToken);

router.post('/login', authController.login);

router.post('/register', async (req, res) => {
    try {
        // Attempt to register the user
        const user = await authController.register(req.body);
        return res.status(200).json(user);
    } catch (error) {
        // Check if the error is a duplicate key error
        if (error.name === 'MongoError' && error.code === 11000) {
            // Handle duplicate key error
            return res.status(400).json({ message: 'Email address is already registered' });
        }
        // Handle other errors
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Apply debugging middleware before and after the auth middleware
router.route('/trips')
    .get(tripsController.tripsList)
    .post(logHeaders, logToken, auth, logDecodedToken, tripsController.tripsAddTrip);

router.route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip);    

module.exports = router;