const notes = require("../utils/data");

const allNotes = async (req, res) => {
  try {
    if (!notes || notes.length === 0) {
      return res.status(404).json({ error: "No notes found." });
    }

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




module.exports = { allNotes };
