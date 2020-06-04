import React from "react";
import "./Friends.css";
import FriendsBodyItems from "./FriendsBodyItems";
import Axios from "axios";
export default class FriendsRequest extends React.Component {
  constructor() {
    super();
    this.state = {
      req: [],
    };
  }

  componentDidMount() {
    const u = JSON.parse(localStorage.getItem("user_data")).id;
    Axios.get("http://localhost:8080/api/friends/" + u).then((res) => {
      console.log("ffffffffffffffffffffffffff", res.data.req); // friend id ala alam
      if (res.data.req === undefined || res.data.req === null) {
        this.setState({ req: [] });
      } else {
        this.setState({ req: [...res.data.req] });
      }
    });
  }

  render() {
    return (
      <div className="friends-request">
        <div className="friends-body-items">
          {this.state.req.map((v, i) => (
            <FriendsBodyItems
              for="request"
              user={v.username}
              key={i}
              id={v.id}
              req={v.req}
              name={v.name}
              lname={v.lastname}
              level={v.level}
            />
          ))}
        </div>
      </div>
    );
  }
}
