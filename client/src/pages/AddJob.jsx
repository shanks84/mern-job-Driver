import { FormRow, SelectFormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", data);
    toast.success("job created");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state == "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Jobs</h4>
        <div className="form-center">
          <FormRow type="text" name="position" label="position" />
          <FormRow type="text" name="company" label="company" />
          <FormRow
            type="text"
            label="job location"
            name="location"
            defaultVal={user.location}
          />
          <SelectFormRow
            name="job_status"
            label="job status"
            defaultValue={JOB_STATUS.TEST}
            list={Object.values(JOB_STATUS)}
          />
          <SelectFormRow
            name="job_type"
            label="job type"
            defaultValue={JOB_TYPE.FTE_INERN}
            list={Object.values(JOB_TYPE)}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting.." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
