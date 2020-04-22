import React from "react";
import "./Login.css";

import { login } from "../../../authorization/Authorization";
import { register } from "../../../authorization/Authorization";
import { MyContext } from "../../../context/MyContext";
import { Redirect } from "react-router";
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      regSuccess: null,
      regError: null,
      email: "",
      password: "",
      password2: "",
      username: "",
      passwordError: "",
      logError: "",
    };
  }
  static contextType = MyContext;

  registerSubmit = (e) => {
    e.preventDefault();
    if (this.state.password != this.state.password2) {
      this.setState({
        passwordError: "Пароль не совпадают",
        regSuccess: false,
        regError: false,
      });
      return;
    } else {
      this.setState({ passwordError: "" });
    }
    let reg = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
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
          email: "",
          password: "",
          password2: "",
          username: "",
          passwordError: "",
        });
        return;
      case "ERROR":
        console.log("switch err");
        this.setState({
          regError: "email или username существует",
          regSuccess: null,
          passwordError: "",
        });
        return;
      default:
        this.setState({
          regError: "Error",
          regSuccess: null,
          passwordError: "",
        });
        return;
    }
  };

  logResult = (res) => {
    if (res == "ERROR") {
      this.setState({ logError: "неверный логин или пароль" });
    } else {
      this.setState({ logError: "" });
      this.setState({ redirect: true });
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
    login(reg, this.context.setAuth, this.logResult);    
  };

  Red = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  changeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
            <input type="email" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="Пароль" />
            <input type="submit" />
            {this.state.logError ? <p style={{color:"red"}}>{this.state.logError}</p> : ""}
          </form>

          <form
            action="/register"
            className="register-form"
            onSubmit={this.registerSubmit}
          >
            <h2>Регистрация</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.changeInput}
            />
            <input
              type="text"
              name="username"
              placeholder="Никнейм"
              onChange={this.changeInput}
            />
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              onChange={this.changeInput}
            />
            <input
              type="password"
              name="password2"
              placeholder="Подверждение пароля"
              onChange={this.changeInput}
            />
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
            {this.state.passwordError ? (
              <p className="error">{this.state.passwordError}</p>
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
