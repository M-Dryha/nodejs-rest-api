const express = require("express");
const { validationBody, authenticate } = require("../../middlewares");
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

router.get("/logout", authenticate, ctrlWrapper(controllers.logout));
router.get("/current", authenticate, ctrlWrapper(controllers.currentUser));
router.patch(
  "/",
  authenticate,
  validationBody(schemas.joiChangeSubscription),
  ctrlWrapper(controllers.updateSubscription)
);

module.exports = router;
