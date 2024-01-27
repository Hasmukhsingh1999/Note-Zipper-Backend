const notes = require("../utils/data");

allNotes = async (req, res) => {
  try {
    res.send(notes);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { allNotes };
