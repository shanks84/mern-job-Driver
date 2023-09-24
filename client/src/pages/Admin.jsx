import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";

import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch("/users/admin/app-stats");
    console.log(data);
    return data;
  } catch (error) {
    toast.error("you are not authorize to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { jobs, users } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0ef89"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
