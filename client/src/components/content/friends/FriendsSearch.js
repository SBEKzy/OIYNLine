import React from "react";
import "./Friends.css";
import FriendsBodyItems from "./FriendsBodyItems";
import Axios from "axios";
export default class FriendsSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [],
    };
  }
  sbtForm = (e) => {
    e.preventDefault();
    const name = e.target.elements["name"].value;
    Axios.get("http://localhost:8080/api/searchFriend/" + name).then((res) => {
      console.log(res.data.result);
      if (res.data.result === undefined) {
        this.setState({ friends: [] });
      } else {
        this.setState({ friends: [...res.data.result] });
      }
    });
  };
  render() {
    return (
      <div className="friends-search">
        <form className="navbar-form" onSubmit={this.sbtForm}>
          <div className="input-group no-border">
            <input
              type="text"
              defaultValue=""
              className="form-control"
              placeholder="Search..."
              name="name"
            />
            <button
              type="submit"
              className="btn btn-white btn-round btn-just-icon"
            >
              <i className="material-icons">search</i>
              <div className="ripple-container"></div>
            </button>
          </div>
        </form>
        <div className="friends-body-items">
          {this.state.friends.map((v, i) => (
            <FriendsBodyItems
              for="search"
              user={v.username}
              key={i}
              id={v.id}
              name={v.name}
              lname={v.lastname}
            />
          ))}
        </div>
      </div>
    );
  }
}
