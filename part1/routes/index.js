var express = require('express');
var router = express.Router();
const db = 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* GET Return a list of all dogs with their size and owner's username. page. */
router.get('/', function(req, res, next) {
  try {
    res.render('index', { title: 'Express' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
