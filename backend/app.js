const express = require('express');
const mongoose = require('mongoose');
const app = express();
const helmet = require("helmet")
const path = require('path');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('../middleware/rateLimiter')

require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://tarek-piiquante:zudri1-parniq-qAbgof@cluster0.8hmeufm.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(helmet())
app.use('/api/', rateLimit);
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
