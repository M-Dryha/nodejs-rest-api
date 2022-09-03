const { User } = require("../../models");

const currentUser = async (req, res) => {
  const { _id } = req.user;
  const curUser = await User.findById({ _id });
  res.json({
    data: {
      email: curUser.email,
      subscription: curUser.subscription,
    },
  });
};

module.exports = currentUser;
