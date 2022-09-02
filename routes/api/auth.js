const express = require("express");
const { validationBody } = require("../../middlewares");
const { users: controllers } = require("../../controllers");
const { schemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.post(
  "/signup",
  validationBody(schemas.joiRegisterSchema),
  ctrlWrapper(controllers.signUp)
);

router.post(
  "/login",
  validationBody(schemas.joiLogInSchema),
  ctrlWrapper(controllers.logIn)
);

module.exports = router;
