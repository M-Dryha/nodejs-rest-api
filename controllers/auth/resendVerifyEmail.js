const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound(`User not found`);
  }
  if (user.verify) {
    throw new BadRequest(`Verification has already been passed`);
  }
  const mail = {
    to: email,
    subject: "Verification confirmation",
    html: `<a href="http//localhost:3000/users/verify/${user.verificationToken}" target="_blank">Сlick to confirm email<a/>`,
  };
  await sendEmail(mail);
  res.json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
