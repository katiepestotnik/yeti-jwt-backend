const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Add the SECRET
const SECRET = process.env.SECRET;

const signup = async (req, res) => {
  try {
    let user = await User.create(req.body);
    const token = createJWT(user);
    // Send back a JWT
    res.json({ token });
  } catch (error) {
    // Probably a duplicate email
    res.status(400).json(error);
  }
};

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}

module.exports = {
  signup,
};
