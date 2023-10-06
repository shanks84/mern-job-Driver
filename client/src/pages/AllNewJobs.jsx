import { JobsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";
import NewJobsContainer from "../components/NewJobsContainer";

export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/new-jobs");
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
    return error;
  }
};

const AllNewJobsContext = createContext();

//how to find from where we are directed so we can decide which context to use
const AllNewJobs = () => {
  const data = useLoaderData();
  return (
    <AllNewJobsContext.Provider value={{ jobs: data.jobs }}>
      <NewJobsContainer />
    </AllNewJobsContext.Provider>
  );
};

export const useAllNewJobsContext = () => useContext(AllNewJobsContext);

export default AllNewJobs;
