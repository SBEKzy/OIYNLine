import React from "react";
import "./Chat.css";

export default class Chat extends React.Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     messages : [],
  //   }
  // }
  btnClick = () => {
    const c = document.getElementById("inputMessage").value;
    console.log("----", this.props.user);
    const data = {
      name: this.props.user,
      text: c,
    };
    this.props.send(data);
    document.getElementById("inputMessage").value = "";
  };
  render() {
    return (
      <div>
        <div className="main-chat">
          <div className="chat-show">
            <div className="messages">
              {this.props.messages.map((m, i) =>
                m.name !== "" && m.text !== "" ? (
                  <div className="message" key={i}>
                    <div className="name">{m.name}</div>
                    <div className="text">{m.text}</div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
          <div className="chat-send">
            <input type="text" className="chat-input" id="inputMessage" />
            <button className="chat-button" onClick={this.btnClick}>
              send
            </button>
          </div>
        </div>
      </div>
    );
  }
}
