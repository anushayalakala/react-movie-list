import React, { Component } from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <div>
        <label htmlFor={name}>{label}</label>
      </div>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
