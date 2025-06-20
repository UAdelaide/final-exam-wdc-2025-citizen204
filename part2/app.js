const express = require('express');
const path = require('path');
require('dotenv').config();
const db = require('./models/db');

const app = express();


// Insert data
async function InitDB() {
  console.log('test');
}

InitDB().then().catch;




const session = require('express-session');
// Middleware
app.use(session({
    secret: 'session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60,
    }
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));


// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);



/* GET Return a list of all dogs with their size and owner's username. page. */
app.get('/api/dogs', async function (req, res, next) {
  try {
    const [result] = await db.query(`
      SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username
      FROM Dogs JOIN Users ON Dogs.owner_id = Users.user_id`);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Export the app instead of listening here
module.exports = app;
