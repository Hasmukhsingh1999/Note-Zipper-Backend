var express = require("express");
const { allNotes, getNotesById } = require("../controllers/notes-controller");
const { createUser, loginUser, getAllUser, logout } = require("../controllers/user-controller");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/notes", allNotes);

// CREATE USER
router.post("/api/users", createUser);

// LOGIN USER
router.post("/api/login", loginUser);

// GET USER
router.get("/api/users",getAllUser);

// LOGOUT USER
router.get('/api/logout',logout)

module.exports = router;
