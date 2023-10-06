import { useOutlet, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllNewJobsContext } from "../pages/AllNewJobs";
import NewJob from "./NewJob";

const NewJobsContainer = () => {
  const data = useAllNewJobsContext();
  const { user } = useOutletContext();
  const { jobs } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h4>No Jobs To display</h4>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {jobs.length}
        {jobs.length > 1 ? " jobs" : " job"}
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <NewJob {...job} role={user.role} key={job._id} />;
        })}
      </div>
    </Wrapper>
  );
};

export default NewJobsContainer;
