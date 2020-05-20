import React from "react";
import "./Main.css";
import img01 from "./images/img-01.png";
import { login } from "../../../authorization/Authorization";
import { register } from "../../../authorization/Authorization";
import { MyContext } from "../../../context/MyContext";
import { Redirect } from "react-router";
export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      register: false,
      redirect: false,
      regSuccess: null,
      regError: null,
      email: "",
      password: "",
      password2: "",
      username: "",
      passwordError: "",
      //logError: "",
    };
  }
  register = () => {
    if (this.state.register) {
      this.setState({ register: false });
    } else {
      this.setState({ register: true });
    }
  };

  static contextType = MyContext;

  registerSubmit = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.password2) {
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
    if (res === "ERROR") {
      this.setState({ logError: "неверный логин или пароль" });
      //document.getElementById("logform").addClass("alert-validate");
      //document.getElementById("logform").classList.add("alert-validate")
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
      return <Redirect to="/account" />;
    }
  };

  changeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const reg = !this.state.register
      ? { display: "none" }
      : { display: "block" };
    const log = !this.state.register
      ? { display: "block" }
      : { display: "none" };
    return (
      <div class="limiter">
        {this.Red()}
        <div class="container-login100">
          <div class="wrap-login100">
            <div class="login100-pic js-tilt" data-tilt>
              <img src={img01} alt="IMG" />
            </div>

            <form
              class="login100-form validate-form"
              style={log}
              onSubmit={this.loginSubmit}
              action="/login"
            >
              <span class="login100-form-title">Log in</span>

              <div
                id="logform"
                class="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  class="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div
                id="logpass"
                class="wrap-input100 validate-input "
                data-validate="Password is wrong"
              >
                <input
                  class="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>

              <div class="container-login100-form-btn">
                <button class="login100-form-btn">Login</button>
              </div>
              {this.state.logError ? (
                <p style={{ color: "red" }}>{this.state.logError}</p>
              ) : (
                ""
              )}
              <div class="text-center p-t-136">
                <a class="txt2" href="#" onClick={this.register}>
                  Зарегестрироватся?
                  <i
                    class="fa fa-long-arrow-right m-l-5"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
            </form>

            <form
              class="login100-form validate-form"
              style={reg}
              action="/register"
              onSubmit={this.registerSubmit}
            >
              <span class="login100-form-title">Sign in</span>

              <div
                class="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  class="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={this.changeInput}
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              <div
                class="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  class="input100"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.changeInput}
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div
                class="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  class="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.changeInput}
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              <div
                class="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  class="input100"
                  type="password"
                  name="password2"
                  placeholder="Password"
                  onChange={this.changeInput}
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
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
              <div class="container-login100-form-btn">
                <button class="login100-form-btn">Sign in</button>
              </div>
              <div class="text-center p-t-136">
                <a class="txt2" href="#" onClick={this.register}>
                  Есть аккаунт?
                  <i
                    class="fa fa-long-arrow-right m-l-5"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
