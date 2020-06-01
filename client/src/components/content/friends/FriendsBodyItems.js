import React from "react";
import "./Friends.css";
import person from "./person.png";
import add from "./add.png";
import audio from "./audio.png";
import video from "./video.png";
import chat from "./chat.png";
import added from "./added.png";
import Axios from "axios";
import { Redirect } from "react-router";

export default class FriendsBodyItems extends React.Component {
  constructor() {
    super();
    this.state = {
      add: false,
      requestadd: false,
      friends: [],
      clcVideo: false,
    };
  }

  clcSearch = () => {
    const u = JSON.parse(localStorage.getItem("user_data")).id;
    if (this.state.add) {
    } else {
      const data = {
        ownId: u,
        friendID: this.props.id,
      };
      console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ", data);
      Axios.post("http://localhost:8080/api/friendAdd", data).then((res) => {
        console.log(res.data);
      });
    }
    this.setState({ add: !this.state.add });
  };
  clcVideo = () => {
    this.setState({ clcVideo: !this.state.clcVideo });
  };
  clcRequest = () => {
    const data = {
      id: this.props.req,
    };
    console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ2", data);
    Axios.put("http://localhost:8080/api/friendAdd", data);
    this.setState({ requestadd: !this.state.requestadd });
  };

  render() {
    // const img = () => {
    //   if (this.props.for == "search") {
    //     return (
    //       <div>
    //         <img src={add} alt="" />
    //       </div>
    //     );
    //   } else if (this.props.for == "friend") {
    //     return (
    //       <div>
    //         <img src={audio} alt="" />
    //         <img src={video} alt="" />
    //         <img src={chat} alt="" />
    //       </div>
    //     );
    //   }
    // };
    if (this.state.clcVideo) {
      return <Redirect to="/video" />;
    }
    return (
      <div className="friends-body-item">
        <div>
          <img src={person} alt="" />
        </div>
        <div className="friends-body-item-body">
          <div>{this.props.user}</div>

          {this.props.for == "search" ? (
            <div>
              <img
                src={!this.state.add ? add : added}
                alt=""
                onClick={this.clcSearch}
              />
            </div>
          ) : this.props.for == "request" ? (
            <div>
              <img
                src={!this.state.requestadd ? add : added}
                alt=""
                onClick={this.clcRequest}
              />
            </div>
          ) : (
            <div>
              <img src={audio} alt="" />
              <img src={video} alt="" onClick={this.clcVideo} />
              <img src={chat} alt="" />
            </div>
          )}
        </div>
      </div>
    );
  }
}
