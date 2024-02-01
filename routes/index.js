var express = require("express");
const { allNotes, getNotesById } = require("../controllers/notes-controller");
const { createUser } = require("../controllers/user-controller");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/notes", allNotes);

// CREATE USER 
router.post('/api/users',createUser)

// GET USER 
router.get('/api/users',)

module.exports = router;
