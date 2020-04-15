import React from "react";
import "./Account.css";
import { MyContext } from '../../../context/MyContext'
import { logout } from '../../../authorization/Authorization'
import { Redirect } from "react-router";
export default class Account extends React.Component {
  state = {
    redirect : false
  }
  static contextType = MyContext;

  lout = () => {
    logout(this.context.setAuth)
    this.setState({redirect : true})
  }
  redirectFunc = () => {
    if(this.state.redirect)
      return <Redirect to="/" />
  }
  render() {
    return (
      
      <div className="account">
      {this.redirectFunc()}
        <button onClick={this.lout}>logout</button>
      </div>
    );
  }
}
