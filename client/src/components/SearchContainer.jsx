import { Link, Form, useNavigation, useSubmit } from "react-router-dom";
import { FormRow, SelectFormRow } from "../components";
import customFetch from "../utils/customFetch";
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "../../../utils/constants";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  let { search, job_status, job_type, sort } = searchValues;
  const submit = useSubmit();
  const debounce = (onChange) => {
    let timeout;
    //since this is the function that is being returned therefore it would have access to event
    return (e) => {
      clearTimeout(timeout);
      setTimeout(() => {
        onChange(e);
      }, 2000);
    };
  };

  const controlledInput = (e) => {
    submit(e.target.form);
  };
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search form</h5>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            onChange={debounce(controlledInput)}
            defaultVal={search}
          />
          <SelectFormRow
            name="job_status"
            label="job status"
            defaultValue={job_status}
            list={["all", ...Object.values(JOB_STATUS)]}
            onChange={debounce(controlledInput)}
          />
          <SelectFormRow
            name="job_type"
            label="job type"
            defaultValue={job_type}
            list={["all", ...Object.values(JOB_TYPE)]}
            onChange={debounce(controlledInput)}
          />
          <SelectFormRow
            name="sort"
            defaultValue={sort}
            list={Object.values(JOB_SORT_BY)}
            onChange={debounce(controlledInput)}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;

/*
e.target.form expression, you can only access the form element that is the ancestor of the element that triggered the event. The .form property is specific to form controls (such as input, button, select, etc.) that are part of an HTML form.

If you try to use it on an element that is not within a form, or if the element does not have a form ancestor, it will result in null. For example:


<div>
  <input type="text" id="myInput">
</div>
In this case, if you attempted to access document.getElementById('myInput').form, it would return null because the input element is not within a form element.

To access a specific form, you typically need to have an input element that is part of that form or use some other method to identify the form element in your JavaScript code. For example, you could add a name or id attribute to the form and use that attribute to select the form element in your JavaScript code.







*/
