import React from "react";
import "./Menu.css";
import { sockett } from "../../../content/webscoket/Socket.js";
import { Redirect } from "react-router";
export default class Menu extends React.Component {
  state = {
    gameStart: false,
    redirect: false,
    x: false,
    socket : null,
  };
  componentDidMount() {

    
    const t = ((msg) => {
      if (this.state.gameStart) {
        const data = JSON.parse(msg.data);
        if (data.ready === 2) {
          this.setState({ redirect: true });
        } else {
          this.setState({ x: true });
        }
      }
    });
    this.setState({socket:sockett(t)})
  }
  gameStart = () => {
    this.setState({ gameStart: !this.state.gameStart });
    let a = Array(9).fill(null);
    if (!this.state.gameStart) {
      console.log("this.state.gameStart", this.state.gameStart);
      a[0] = "ready";
    } else {
      console.log("this.state.gameStart_else", this.state.gameStart);
      a[0] = "notready";
    }
    console.log("456 ->", a);
    this.state.socket.sendMsg(a);
  };

  Red = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/tictactoe",
            state: {
              x: this.state.x,
            },
          }}
        />
      );
    }
  };

  render() {
    return (
      <div>
        {this.Red()}
        <button onClick={this.gameStart}>
          {this.state.gameStart ? "Ждем опонента" : "Играть"}
        </button>
        <button>О игре</button>
        <button>Правила</button>
        <button>Выход</button>
      </div>
    );
  }
}
