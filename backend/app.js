// Creates an instance of an Express.js app.
const express = require('express');
const app = express();

// Requires
const mongoose = require('mongoose');
const helmet = require("helmet")
const path = require('path');

// Requires Routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

require('dotenv').config({ path : './config/.env' });

const rateLimit = require('express-rate-limit');

// Instance of the rate limiter with specific options. 
// Will allow a maximum of 50 requests per minute 
// and will send standard headers and no legacy headers.
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, 
	max: 50, 
	standardHeaders: true, 
	legacyHeaders: false,
})

// Use the express.json middleware, which parses incoming requests with JSON payloads
app.use(express.json());
app.use(limiter);

mongoose.connect(process.env.MONGO,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion to MongoDB succeed'))
    .catch(() => console.log('Connexion to MongoDB failed'));

// sets up a middleware function that sets CORS (Cross-Origin Resource Sharing) headers to allow requests from any origin. 
// These headers specify which HTTP methods are allowed and which headers are allowed in cross-origin requests.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Tells the app to use the helmet middleware with specific options. 
// It sets the cross-origin resource policy header to "same-site" to protect against cross-site request forgery attacks.
app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site" }
}));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

//  tells the app to serve static files from the images directory when a request with the 
// /images prefix is made. 
// The express.static middleware is used to serve the files, 
// and the path.join method is used to build the full path to the directory.

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
