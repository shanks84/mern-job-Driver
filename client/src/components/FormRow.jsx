import React from "react";

const FormRow = ({ name, label, type, defaultVal = "", onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        required
        defaultValue={defaultVal}
        onChange={onChange}
      />
    </div>
  );
};

export default FormRow;
