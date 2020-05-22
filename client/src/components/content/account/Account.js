import React from "react";
import "./Account.css";
import { MyContext } from "../../../context/MyContext";
import { logout } from "../../../authorization/Authorization";
import { Redirect } from "react-router";
import Profile from "../profile/Profile";
export default class Account extends React.Component {
  state = {
    redirect: false,
  };
  static contextType = MyContext;

  lout = () => {
    logout(this.context.setAuth);
    this.setState({ redirect: true });
  };
  redirectFunc = () => {
    if (this.state.redirect) return <Redirect to="/" />;
  };

  render() {
    return (
      <div>
        {this.redirectFunc()}
        <Profile lout={this.lout} context={this.context} />
      </div>
    );
  }
}
