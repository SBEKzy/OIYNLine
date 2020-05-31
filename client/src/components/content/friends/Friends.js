import React from "react";
import "./Friends.css";
import FriendsBodyItems from "./FriendsBodyItems";
import FriendsSearch from "./FriendsSearch";
import FriendsRequest from "./FriendsRequest";
import MyFriends from "./MyFriends";
export default class Friends extends React.Component {
  constructor() {
    super();
    this.state = {
      for: "myFriends",
    };
  }
  myFriends = () => {
    this.setState({
      for: "myFriends",
    });
  };
  requestFriends = () => {
    this.setState({
      for: "requestFriends",
    });
  };
  searchFriends = () => {
    this.setState({
      for: "searchFriends",
    });
  };
  render() {
    let body = "";
    if (this.state.for === "myFriends") {
      body = <MyFriends />;
    } else if (this.state.for === "requestFriends") {
      body = <FriendsRequest/>;
    } else if (this.state.for === "searchFriends") {
      body = <FriendsSearch for="search" />;
    }
      
    return (
      <div>
        <div className="friends-header">
          <div onClick={this.myFriends}>Ваши друзья</div>
          <div onClick={this.requestFriends}>Заявки</div>
          <div onClick={this.searchFriends}>Найти друзьей</div>
        </div>
        <div className="friends-body">{body}</div>
      </div>
    );
  }
}
