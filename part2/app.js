const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const session = require('express-session');
// Middleware
app.use(session({
    secret: 'session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60,
        secure: false
    }
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));


// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;
