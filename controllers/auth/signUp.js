const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const { User } = require("../../models");

const signUp = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email ${email} already exists`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
  });
  res.status(201).json({
    status: "success",
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    },
  });
};

module.exports = signUp;
