import React from "react";
import "./Login.css";

import { login } from "../../../authorization/Authorization";
import { register } from "../../../authorization/Authorization";
import { MyContext } from "../../../context/MyContext";
import { Redirect } from "react-router";
//import { useSelector, useDispatch } from "react-redux";
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      regSuccess: null,
      regError: null,
    };
  }
  static contextType = MyContext;

  registerSubmit = (e) => {
    e.preventDefault();
    let email = e.target.elements["email"].value;
    let pass = e.target.elements["password"].value;
    let username = e.target.elements["username"].value;
    let reg = {
      email: email,
      password: pass,
      username: username,
    };
    register(reg, this.regResult);
  };
  regResult = (res) => {
    switch (res) {
      case "SUCCESS":
        console.log("switch suc");
        this.setState({
          regSuccess: "регистрация прошла успешно",
          regError: null,
        });
        return;
      case "ERROR":
        console.log("switch err");
        this.setState({
          regError: "email или username существует",
          regSuccess: null,
        });
        return;
       default:
        this.setState({
          regError: "Error",
          regSuccess: null,
        });
        return;
    }
  };
  loginSubmit = (e) => {
    e.preventDefault();
    let email = e.target.elements["email"].value;
    let pass = e.target.elements["password"].value;
    let reg = {
      email: email,
      password: pass,
    };
    login(reg, this.context.setAuth);
    this.setState({ redirect: true });
  };

  Red = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <div className="login">
        {this.Red()}
        <div className="login-forms">
          <form
            action="/login"
            className="login-form"
            onSubmit={this.loginSubmit}
          >
            <h2>Войти</h2>
            <input type="text" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="Пароль" />
            <input type="submit" />
          </form>

          <form
            action="/register"
            className="register-form"
            onSubmit={this.registerSubmit}
          >
            <h2>Регистрация</h2>
            <input type="text" name="email" placeholder="Email" />
            <input type="text" name="username" placeholder="Никнейм" />
            <input type="password" name="password" placeholder="Пароль" />
            <input type="password" placeholder="Подверждение пароля" />
            {this.state.regSuccess ? (
              <p className="success">{this.state.regSuccess}</p>
            ) : (
              ""
            )}
            {this.state.regError ? (
              <p className="error">{this.state.regError}</p>
            ) : (
              ""
            )}

            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}
