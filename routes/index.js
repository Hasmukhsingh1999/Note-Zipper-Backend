var express = require("express");
const { allNotes, getNotesById } = require("../controllers/notes-controller");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/notes", allNotes);

router.get('/api/notes/:id',getNotesById)

module.exports = router;
