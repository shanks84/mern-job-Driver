import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  if (error.status) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not-found" />
          <h3>Opps! page not found</h3>
          <p>We cant seem to find what you are looking for</p>
          <Link to="/dashboard">back to home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <div>
      <h1>Error Page</h1>
      <Link to={"/dashboard"}>Back to home</Link>
    </div>
  );
};

export default Error;
