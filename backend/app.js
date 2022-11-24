const express = require('express');
const mongoose = require('mongoose');
const app = express();

const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

const cors = require('cors');
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

app.post('/api/auth/signup', (req, res, next) => {
    // Handle signup
});

app.post('/api/auth/login', (req, res, next) => {
    // Handle login
});

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes)



module.exports = app;