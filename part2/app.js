const express = require('express');
const path = require('path');
require('dotenv').config();
const db = require('./models/db');

const app = express();


// Insert data
async function InitDB() {
  try {
    await db.query(`
      INSERT INTO Users (username, email, password_hash, role) VALUES
      ('alice123', 'alice@example.com', 'hashed123', 'owner'),
      ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
      ('carol123', 'carol@example.com', 'hashed789', 'owner'),
      ('user1', 'user1@example.com', '666', 'walker'),
      ('user2', 'user2@example.com', '666', 'owner');
      `);

    await db.query(`
INSERT INTO Dogs (owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
((SELECT user_id FROM Users WHERE username = 'user2'), 'dog1', 'large'),
((SELECT user_id FROM Users WHERE username = 'user2'), 'dog2', 'small'),
((SELECT user_id FROM Users WHERE username = 'alice123'), 'dog3', 'medium');
      `);

    await db.query(`

      `)

  } catch (error) {
    console.log(error);
  }
}

InitDB().then().catch();




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
