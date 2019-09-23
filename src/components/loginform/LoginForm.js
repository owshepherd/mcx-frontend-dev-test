import React, { Component } from "react";
import "./loginform.css";
import auth from "../auth/Auth";
import axios from "axios";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail = e => {
    this.setState({ email: e.target.value });
  };
  handleChangePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const credentials = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(this.state);
    axios
      .post(`http://35.201.2.209:8000/login`, credentials)
      .then(res => {
        auth.login(res, () => {
          this.props.history.push("/devices");
        });
      })
      .catch(err => {
        this.setState({ error: true });
        console.log(err);
      });
  };

  render() {
    return (
      <div className="loginform">
        {this.state.error === true ? (
          <div className="errorbar">
            <p>Your login credentials were incorrect. Please try again.</p>
          </div>
        ) : (
          ""
        )}

        <div className="box">
          <h1 className="header">Login</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="inputfield">
              <i className="fa fa-envelope"></i>
              <input
                type="text"
                name="email"
                placeholder="Email Address"
                onChange={this.handleChangeEmail}
              />
            </div>
            <div className="inputfield">
              <i className="fa fa-exclamation-circle"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChangePassword}
              />
            </div>
            <button className="loginbtn">Log in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
