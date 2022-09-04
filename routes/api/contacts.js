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

router.get("/:id", isValidId, controllers.getById);

router.post(
  "/",
  authenticate,
  validationBody(joiSchema),
  controllers.addContact
);

router.delete("/:id", isValidId, controllers.removeById);

router.put(
  "/:id",
  isValidId,
  validationBody(joiSchema),
  controllers.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validationBody(joiChangeFavorite),
  controllers.updateFavoriteById
);

module.exports = router;
