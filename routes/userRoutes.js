import express from "express";
import {
  getCurrentUser,
  getApplicationStat,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUser } from "../middleware/validationMiddleware.js";
import { authorizePermission } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.route("/current-user").get(getCurrentUser);
router
  .route("/admin/app-stats")
  .get(authorizePermission("admin"), getApplicationStat);
router
  .route("/update-user")
  .patch(upload.single("avatar"), validateUpdateUser, updateUser);

export default router;
