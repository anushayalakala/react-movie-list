import React, { Component } from "react";
import joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validate = () => {
    const opyions = { abortEarly: false };

    const result = joi.validate(this.state.data, this.schema, opyions);
    console.log(result);
    if (!result.error) return null;
    const error = {};
    for (let item of result.error.details) {
      error[item.path[0]] = item.message;
    }
    return error;
  };
  handleSumbit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit(e.currentTarget.value);
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMesssage = this.validateProperty(input);
    if (errorMesssage) {
      errors[input.name] = errorMesssage;
    } else delete errors[input.name];
    const data = { ...this.state.data };

    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        value={data[name]}
        name={name}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        label={label}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        options={options}
        error={errors[name]}
      ></Select>
    );
  };
}

export default Form;
