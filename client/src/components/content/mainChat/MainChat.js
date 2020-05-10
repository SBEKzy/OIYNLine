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
      socket : null,
    };
  }

  componentDidMount() {
    const u = JSON.parse(localStorage.getItem("user_data"));
    this.setState({ username: u.username });
    this.socket = websocket(this.getMessages);
    console.log("ssss" , this.socket)
  }
componentWillUnmount(){
this.socket.socket.close() 
}
  getMessages = (msg) => {
    console.log("getMessages", JSON.parse(msg.data));
    const u = JSON.parse(msg.data);
    if (u.register === 1 || u.register === 2) {
      this.setState({
        usersOnline: [ ...u.clients],
        //usersOnline: [...this.state.usersOnline, u.name],
      });
      console.log("usersOnline", this.state.usersOnline);
    } else if (u.name !== "" && u.text !== "" && typeof u.text === "string") {
      console.log("132");

      this.setState({
        messages: [...this.state.messages, JSON.parse(msg.data)],
      });
    }
  };

  render() {
    return (
      <div className="main-mainchat">
        <Chat
          send={(msg) => this.socket.sendMsg(msg)}
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
