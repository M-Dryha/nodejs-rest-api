const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findOneAndUpdate(
      { id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
