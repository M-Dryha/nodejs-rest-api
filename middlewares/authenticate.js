const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("./../models");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(Unauthorized(" Unauthorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(Unauthorized(" Unauthorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(Unauthorized(error.message));
  }
};

module.exports = authenticate;
