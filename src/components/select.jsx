import React, { Component } from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} className="form-control" {...rest}>
        <option value="" />
        {options.map(option => (
          <option value={option._id}>{option.name}</option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
