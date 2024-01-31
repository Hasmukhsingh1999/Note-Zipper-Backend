createUser = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    res.json({ name, email });
  } catch (error) {}
};

module.exports = { createUser };
