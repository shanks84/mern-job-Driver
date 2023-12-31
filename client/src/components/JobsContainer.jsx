import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = ({ data, newJob = "false" }) => {
  //const { data } = useAllJobsContext();
  /*why does it get print two times while rendering
  console.log(jobs);
  */
  const { numOfPages, jobsCount, currentPage, jobs } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h4>No jobs to display</h4>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {jobsCount || jobs.length}
        {jobsCount > 1 ? " jobs" : " job"}
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job {...job} key={job._id} newJob={newJob} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
