import Job from "../models/jobModel.js";
import newJob from "../models/newJobModel.js";
import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
import day from "dayjs";
import mongoose from "mongoose";
import dayjs from "dayjs";

//only admin
export const getAllNewJob = async (req, res) => {
  const newJobs = await newJob.find({});
  res.status(StatusCodes.OK).json({ jobs: newJobs });
};

export const getSingleNewJob = async (req, res) => {
  const { id } = req.params;
  const job = await newJob.findById(id);
  if (!job) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

export const createNewJob = async (req, res) => {
  const job = await newJob.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const updateNewJob = async (req, res) => {
  const { id } = req.params;
  const updateNewJob = await newJob.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateNewJob) {
    return res.status(StatusCodes.OK).json({ err: `No job with id ${id}` });
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "job updated", job: updateNewJob });
};

export const deleteNewJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await newJob.findByIdAndDelete(id);
  if (!removedJob)
    return res.status(StatusCodes.OK).json({ err: `No job with id ${id}` });
  res.status(StatusCodes.OK).json({ message: "job deleted", job: removedJob });
};

export const getRegisteredList = async (req, res) => {
  const { id } = req.params;
  const newJobPost = await newJob.findById(id);
  if (!newJob)
    return res.status(StatusCodes.OK).json({ message: `No job with id ${id}` });
  const jobId = newJobPost.jobId;
  const jobList = await Job.find({ jobId });
  if (jobList.length === 0)
    return res.status(StatusCodes.OK).json({ registerCount: 0, users: [] });
  let registeredList = [];
  let promises = [];
  jobList.forEach((item, index) => {
    let promise = User.findById(item.created_by).then((user) => {
      registeredList.push(user);
    });
    promises.push(promise);
  });
  Promise.all(promises).then(() => {
    console.log(registeredList);
    res
      .status(StatusCodes.OK)
      .json({ registerCount: jobList.length, users: registeredList });
  });
};

//user-end controllers

const findUserFeed = (adminJob, userJob) => {
  let map = new Map();
  adminJob.forEach((item, index) => {
    map.set(item.jobId, 1);
  });

  const ans = [];
  userJob.forEach((item, index) => {
    if (item.jobId && map.has(item.jobId)) map.set(item.jobId, 2);
  });

  adminJob.forEach((item, index) => {
    if (map.get(item.jobId) != 2) ans.push(item);
  });

  return ans;
};

export const getAllNewJobUser = async (req, res) => {
  const adminJobPost = await newJob.find({});
  const userAppliedJob = await Job.find({
    created_by: req.user.userId,
  });
  const userFeed = findUserFeed(adminJobPost, userAppliedJob);
  res.status(StatusCodes.OK).json({ message: "userFeed", jobs: userFeed });
};
