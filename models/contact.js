const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaValidationErrors);

const joiSchema = Joi.object({
  name: Joi.string().min(3).alphanum().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  favorite: Joi.boolean(),
});

const joiChangeFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("Contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  joiChangeFavorite,
};
