import { Router } from "express";
import {
  getAllNewJob,
  getSingleNewJob,
  createNewJob,
  updateNewJob,
  deleteNewJob,
  getRegisteredList,
} from "../controllers/newJobControllers.js";
const router = Router();

//api/v1/newJob
router.route("/").get(getAllNewJob).post(createNewJob);

router
  .route("/:id")
  .get(getSingleNewJob)
  .patch(updateNewJob)
  .delete(deleteNewJob);

router.route("/:id/reg-list").get(getRegisteredList);

export default router;
