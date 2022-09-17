const express = require("express");
const { validationBody, authenticate, upload } = require("../../middlewares");
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
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(controllers.updateAvatar)
);
router.get(
  "/verify/:verificationToken",
  ctrlWrapper(controllers.resendVerifyEmail)
);
router.post(
  "/verify",
  validationBody(schemas.verifyEmailSchema),
  ctrlWrapper(controllers.verifyEmail)
);

module.exports = router;
