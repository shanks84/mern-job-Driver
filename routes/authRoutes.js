import express from "express";
import {
  loginController,
  logout,
  registerController,
} from "../controllers/authControllers.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.route("/login").post(validateLoginInput, loginController);
router.route("/register").post(validateRegisterInput, registerController);
router.route("/logout").get(logout);

export default router;
