const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");

const signUp = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email ${email} already exists`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    verificationToken,
    avatarURL,
  });
  const mail = {
    to: email,
    subject: "Verification confirmation",
    html: `<a href="http//localhost:3000/users/verify/${verificationToken}" target="_blank">Сlick to confirm email<a/>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signUp;
