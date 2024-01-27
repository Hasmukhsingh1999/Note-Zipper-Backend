var express = require('express');
const { allNotes } = require('../controllers/notes-controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/notes',allNotes)

module.exports = router;
