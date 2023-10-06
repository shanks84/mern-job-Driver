import express from "express";
import {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobControllers.js";
import { getAllNewJobUser } from "../controllers/newJobControllers.js";
import { validateJobInput } from "../middleware/validationMiddleware.js";
const router = express.Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);

router.route("/new-jobs").get(getAllNewJobUser);

router.route("/show-stats").get(showStats);

router
  .route("/:id")
  .get(getSingleJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);

export default router;
