import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import User from "./models/UserModel.js";
import Job from "./models/jobModel.js";
try {
  mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: "test123@gmail.com" });
  console.log(user);
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, created_by: user._id, createdAt: job.timestamps };
  });
  await Job.deleteMany({ created_by: user._id });
  await Job.create(jobs);
  console.log("Success");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
