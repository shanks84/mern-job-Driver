import React from "react";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { toast } from "react-toastify";
import { Logo, FormRow } from "../components";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("login successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
    return error;
  }
};
const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state == "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>LOGIN</h4>
        <FormRow name={"email"} label={"email"} type={"email"} />
        <FormRow name={"password"} label={"password"} type={"password"} />
        <button className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "logging in.." : "login"}
        </button>
        <p>
          Haven't Registerd?
          <Link to="/register" className="member-btn">
            Register here
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
