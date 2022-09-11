const express = require("express");
const { contacts: controllers } = require("../../controllers");
const router = express.Router();
const {
  validationBody,
  isValidId,
  authenticate,
} = require("../../middlewares");
const { joiSchema, joiChangeFavorite } = require("../../models/contact");

router.get("/", authenticate, controllers.getAll);

router.get("/:id", authenticate, isValidId, controllers.getById);

router.post(
  "/",
  authenticate,
  validationBody(joiSchema),
  controllers.addContact
);

router.delete("/:id", authenticate, isValidId, controllers.removeById);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validationBody(joiSchema),
  controllers.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validationBody(joiChangeFavorite),
  controllers.updateFavoriteById
);

module.exports = router;
