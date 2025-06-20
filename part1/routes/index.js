var express = require('express');
var router = express.Router();
const db = require('../models/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* GET Return a list of all dogs with their size and owner's username. page. */
router.get('/api/dogs', async function(req, res, next) {
  try {
    const [rows] = await db.query(`
        SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username
        FROM Dogs JOIN Users
          ON d.owner_id = u.user_id`);

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
