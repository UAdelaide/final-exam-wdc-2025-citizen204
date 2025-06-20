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
    const [result] = await db.query(`
    SELECT
      WalkRequests.request_id,
      Dogs.name as dog_name,
      WalkRequests.requested_time,
      WalkRequests.duration_minutes,
      WalkRequests.location,
      Users.username as owner_username
    FROM WalkRequests
    JOIN Dogs
      ON WalkRequests.dog_id = Dogs.dog_id
    JOIN Users
      ON Dogs.owner_id = Users.user_id
    WHERE
      WalkRequests.status = 'open';`);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});



/* Return all open walk requests, including the dog name, requested time, location, and owner's username. */
router.get('/api/walkrequests/open', async function(req, res, next) {
  try {
    const [result] = await db.query(`
        SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username
        FROM Dogs JOIN Users
          ON d.owner_id = u.user_id`);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});



/* Return a summary of each walker with their average rating and number of completed walks. */
router.get('/api/walkers/summary', async function(req, res, next) {
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
