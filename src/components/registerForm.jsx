import React, { Component } from "react";
import joi from "joi-browser";
import Form from "./form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };
  schema = {
    username: joi
      .string()
      .required()
      .email()
      .label("Username"),
    password: joi
      .string()
      .required()
      .min(5)
      .label("Password"),
    name: joi
      .string()
      .required()
      .label("Name")
  };
  doSubmit = () => {
    console.log("submitted");
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSumbit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name", "")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
