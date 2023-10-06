import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { BsLink45Deg } from "react-icons/bs";
import { Link, Form, redirect, useNavigate } from "react-router-dom";
import JobInfo from "./JobInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Job";
import { toast } from "react-toastify";
day.extend(advancedFormat);

const NewJob = ({
  _id,
  company,
  position,
  location,
  job_status,
  job_type,
  createdAt,
  jobId,
  role,
  link,
}) => {
  const navigate = useNavigate();
  const date = day(createdAt).format("MMM Do, YYYY");
  const applyJob = async () => {
    try {
      const data = {
        company,
        position,
        location,
        job_status: "pending",
        job_type,
        jobId,
      };
      window.open(link);
      await customFetch.post("/jobs", data);
      toast.success("Job Created");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    navigate("/dashboard/all-jobs");
  };
  const deleteJob = async () => {
    try {
      await customFetch.delete(`/new-jobs/${_id}`);
      toast.success("Job deleted");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    navigate("/dashboard/new-jobs");
  };
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{`${company}` + (jobId ? `-${jobId}` : "")}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={location} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={position} />
        </div>
        <footer className="actions">
          <button className="btn apply-btn" onClick={applyJob}>
            Apply
          </button>
          {role == "admin" && (
            <button
              type="button"
              onClick={deleteJob}
              className="btn delete-btn"
            >
              Delete
            </button>
          )}
        </footer>
      </div>
    </Wrapper>
  );
};

export default NewJob;
