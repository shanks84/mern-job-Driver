import React from "react";

const SelectFormRow = ({ name, label, list, defaultValue = "", onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((itemValue) => {
          return <option key={itemValue}>{itemValue}</option>;
        })}
      </select>
    </div>
  );
};

export default SelectFormRow;
