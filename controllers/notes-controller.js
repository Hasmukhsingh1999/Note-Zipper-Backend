const notesData = require("../utils/data");

const allNotes = async (req, res) => {
  try {
    if (!notesData || notesData.length === 0) {
      return res.status(404).json({ error: "No notes found." });
    }

    res.json(notesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNotesById = async (req, res) => {
  try {
    const note = notesData.find((n) => n.id === req.params.id);
    res.send(note)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { allNotes, getNotesById };
