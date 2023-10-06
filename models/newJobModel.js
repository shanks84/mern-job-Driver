import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
const newJobSchema = mongoose.Schema(
  {
    jobId: String,
    company: String,
    position: String,
    job_status: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    job_type: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FTE,
    },
    location: String,
    link: String,
  },
  { timestamps: true }
);

export default mongoose.model("newJob", newJobSchema);
