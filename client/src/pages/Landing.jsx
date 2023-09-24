import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>Driver</span>
          </h1>
          <p>
            DRIVING YOUR CARRER JOURNEY FORWARD
            <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ullam suscipit neque ipsum earum odio minima doloribus, ad amet at,
            ut commodi laboriosam atque ex sunt, explicabo numquam! Recusandae,
            laboriosam ullam!
          </p>
          <Link className="btn register-link" to="/register">
            Register
          </Link>
          <Link className="btn " to="/login">
            Login
          </Link>
        </div>
        <img src={main} alt="job-hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
