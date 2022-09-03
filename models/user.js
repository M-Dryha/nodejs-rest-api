const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaValidationErrors);
const User = model("user", userSchema);

const joiRegisterSchema = Joi.object({
  password: Joi.string().required(),
  repeat_password: Joi.ref("password"),
  email: Joi.string().pattern(emailRegexp).required(),
});

const joiLogInSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});
const joiChangeSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  joiRegisterSchema,
  joiLogInSchema,
  joiChangeSubscription,
};

module.exports = {
  User,
  schemas,
};
