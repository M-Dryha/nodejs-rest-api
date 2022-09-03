const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const newSubscription = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!newSubscription) {
    throw new NotFound(`Contact with id=${_id} not found`);
  }
  res.json({
    data: newSubscription,
  });
};

module.exports = updateSubscription;
