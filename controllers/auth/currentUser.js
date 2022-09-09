const currentUser = async (req, res) => {
  res.json({
    data: {
      email: req.user.email,
      subscription: req.user.subscription,
    },
  });
};

module.exports = currentUser;
