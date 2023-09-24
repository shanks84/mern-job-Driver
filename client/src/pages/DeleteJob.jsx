import React from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ params }) => {
  console.log("hello dlkalf");
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("deleted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return redirect("/dashboard/all-jobs");
};

const DeleteJob = () => {
  return <h1>DeleteJob Page</h1>;
};

export default DeleteJob;
