import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import Job from "../models/jobModel.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      //validationResult returns an array
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateTest = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("name should be provided")
    .isLength({ min: 3, max: 5 })
    .withMessage("name should minimum 3 and maximum 5 character long")
    .trim(),
]);

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company name should be provided"),
  body("position").notEmpty().withMessage("position should be provided"),
  body("location").notEmpty().withMessage("job location should be provided"),
  body("job_status")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid job-status"),
  body("job_type")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("Invalid job-type"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError("Invalid mongo id");
    const job = Job.findById(value);
    // If you have decided not to give admin access to all the jobs
    const isAdmin = req.user.role;
    const isOwner = job.created_by.toString() !== req.user.userId;
    if (!job || isAdmin || isOwner)
      throw new NotFoundError(
        `No job with Id ${value} / not authorized to access`
      );
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name should be provided"),
  body("email")
    .notEmpty()
    .isEmail()
    .trim()
    .withMessage("email should be provided")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      console.log(user);
      if (user) throw new BadRequestError("User already exist");
    }),
  body("password")
    .isLength({ min: 7 })
    .withMessage("password should be minimum of 7 characters"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("invalid email"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUser = withValidationErrors([
  body("name").notEmpty().withMessage("name should be provided"),
  body("email")
    .notEmpty()
    .isEmail()
    .trim()
    .withMessage("email should be provided")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId)
        throw new BadRequestError("User already exist");
    }),
  body("location").notEmpty().withMessage("location should be provided"),
  body("last_name").notEmpty().withMessage("last_name should be provided"),
  body("role").custom(async (role, { req }) => {
    if (req.user.role != role && role === "admin")
      throw new BadRequestError("Access denied");
  }),
]);
