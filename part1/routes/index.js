var express = require('express');
var router = express.Router();
const db = require('../models/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* GET Return a list of all dogs with their size and owner's username. page. */
router.get('/', function(req, res, next) {
  try {
    const rows = db.query(``);
    
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
