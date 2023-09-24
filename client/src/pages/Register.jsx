import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "../components";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  //converts a object from array of arrays
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration Successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
    return error;
  }
  return null;
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow name="name" label="name" type="text" />
        <FormRow name="last_name" label="last name" type="text" />
        <FormRow name="location" label="location" type="text" />
        <FormRow name="email" label="email" type="email" />
        <FormRow name="password" label="password" type="password" />
        <button className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting...." : "Submit"}
        </button>
        <p>
          Already registered?
          <Link to="/login" className="member-btn">
            login here
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
