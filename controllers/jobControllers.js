import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
import day from "dayjs";
import mongoose from "mongoose";
import dayjs from "dayjs";

export const getAllJobs = async (req, res) => {
  const { search, job_status, job_type, sort } = req.query;
  const queryObject = {};
  if (req.user.role === "user") queryObject.created_by = req.user.userId;

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }
  if (job_status && job_status !== "all") queryObject.job_status = job_status;
  // console.log(queryObject);

  if (job_type && job_type !== "all") queryObject.job_type = job_type;

  const sortOptions = {
    oldest: "createdAt",
    newest: "-createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  //pagination
  const page = Number(req.query?.page) || 1;
  const limit = Number(req.query?.limit) || 10;
  const skip = limit * (page - 1);

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  //console.log(jobs[0].company);

  const jobsCount = await Job.countDocuments(queryObject);

  const numOfPages = Math.ceil(jobsCount / limit);
  res
    .status(StatusCodes.OK)
    .json({ numOfPages, jobsCount, currentPage: page, jobs });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
  // we can directly pass req.body, anything not in schmea will be simply ignored.
  req.body.created_by = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

//already a layer of validation is present on top of controllers by default
export const updateJob = async (req, res) => {
  const { id } = req.params;
  //const job = await Job.findOneAndUpdate({ _id: id }, req.body);
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedJob) {
    return res.status(200).json({ err: `No job with id ${id}` });
  }
  res
    .status(StatusCodes.OK)
    .send({ message: "job is modified", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  //const job = Job.findOneAndRemove({ _id: id });
  const removedJob = await Job.findByIdAndDelete(id);
  if (!removedJob) {
    return res.status(404).json({ err: `No job with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ msg: "job deleted", job: removedJob });
};

export const showStats = async (req, res) => {
  let stats;
  if (req.user.role == "admin") {
    stats = await Job.aggregate([
      { $group: { _id: "$job_status", count: { $sum: 1 } } },
    ]);
  } else {
    stats = await Job.aggregate([
      { $match: { created_by: new mongoose.Types.ObjectId(req.user.userId) } },
      { $group: { _id: "$job_status", count: { $sum: 1 } } },
    ]);
  }
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
    accepted: stats.accepted || 0,
  };
  let monthlyApplications = await Job.aggregate([
    { $match: { created_by: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
