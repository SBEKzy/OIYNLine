import React from "react";
import "./Friends.css";
import FriendsBodyItems from "./FriendsBodyItems";
import Axios from "axios";
export default class FriendsRequest extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [],
    };
  }

  componentDidMount() {
    const u = JSON.parse(localStorage.getItem("user_data")).id;
    Axios.get("http://localhost:8080/api/friends/" + u).then((res) => {
      console.log("ffffffffffffffffffffffffff", res.data.my); // friend id ala alam
      if (res.data.my === undefined || res.data.my === null) {
        this.setState({ friends: [] });
      } else {
        this.setState({ friends: [...res.data.my] });
      }
    });
  }

  render() {
    return (
      <div className="friends-body-items">
        {this.state.friends.map((v, i) => (
          <FriendsBodyItems
            for="friends"
            user={v.username}
            key={i}
            id={v.id}
            name={v.name}
            lname={v.lastname}
          />
        ))}
      </div>
    );
  }
}
