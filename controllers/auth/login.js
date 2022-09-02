const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const { User } = require("../../models");

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`User with email ${email} is not authorized`);
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new Unauthorized("Password is wrong");
  }
  const token = "dfvfvdfvfv";
  res.json({ token });
};

module.exports = logIn;
