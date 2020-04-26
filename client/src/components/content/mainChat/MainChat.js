import React from "react";
import "./MainChat.css";
import Chat from "../chat/Chat";
import { websocket } from "./socketMainChat";
export default class MainChat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      usersOnline: [],
    };
  }

  componentDidMount() {
    const u = JSON.parse(localStorage.getItem("user_data"));
    this.setState({ username: u.username });
    this.send = websocket(this.getMessages);
  }

  getMessages = (msg) => {
    console.log("1231231321", JSON.parse(msg.data));
    const u = JSON.parse(msg.data);
    if (u.register === 1) {
      this.setState({
        usersOnline: [...this.state.usersOnline, u.name],
      });
    } else if(u.name !== "" && u.text !== "" && typeof(u.text) === "string") {
      console.log("132");
      console.log(u.name);
      console.log(u.text);
      this.setState({
        messages: [...this.state.messages, JSON.parse(msg.data)],
      });
    }
  };

  render() {
    return (
      <div className="main-mainchat">
        <Chat
          send={(msg) => this.send(msg)}
          messages={this.state.messages}
          user={this.state.username}
        />
        <div>
          <h1>В сети</h1>
          <div className="chat-status">
            {this.state.usersOnline.map((m, i) => (
              <div className="chat-status-user" key={i}>
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
