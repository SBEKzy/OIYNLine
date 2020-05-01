import React from "react";
import "./Account.css";
import { MyContext } from "../../../context/MyContext";
import { logout } from "../../../authorization/Authorization";
import { Redirect } from "react-router";
import InfoAccount from "./infoAccount/InfoAccount"
import InfoGame from "./infogame/InfoGame"
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
      <div className="account">
        <div className="info">
        {this.redirectFunc()}
          <InfoAccount lout={this.lout} context={this.context}/>
          <InfoGame />
        </div>
      </div>
    );
  }
}
