const express = require('express');
const mongoose = require('mongoose');
const app = express();
const helmet = require("helmet")
const path = require('path');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
require('dotenv').config({ path : './config/.env' });


const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 50, // Limiter l'ip à faire 50 requêtes par window (ici 1mn)
	standardHeaders: true, // Retourne `RateLimit-*` dans les headers
	legacyHeaders: false, // Désactiver les headers `X-RateLimit-*`
})

app.use(express.json());
app.use(limiter);

mongoose.connect(process.env.MONGO,
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
app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site" }
}));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
