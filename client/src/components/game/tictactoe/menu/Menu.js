import React from "react";
import "./Menu.css";
import { sockett } from "../../../content/webscoket/Socket.js";
import { Redirect } from "react-router";
import Game from "../Game";
import Axios from "axios";
export default class Menu extends React.Component {
  state = {
    gameStart: false,
    redirect: false,
    x: false,
    socket: null,
    pools: [],
  };
  componentDidMount() {
    const t =( (msg) => {
      if (this.state.gameStart) {
        const data = JSON.parse(msg.data);
        if (data.ready === 2) {
          this.setState({ redirect: true });
        } else {
          this.setState({ x: true });
        }
      }
    // };
    // this.setState({ socket: sockett(t) });
    // Axios.get("http://localhost:8080/api/tictactoe-menu/testestest?type=Create").then((res) => {
    //   console.log("ffffffffffffffffffffffffff", res.data.data); // friend id ala alam
    //   if (res.data.data === undefined || res.data.data === null) {
    //     this.setState({ pools: [] });
    //   } else {
    //     this.setState({ pools: [...res.data.data] });
    //   }
    });
    const { type } = this.props.location.state
    const { name } = this.props.location.state
    
    this.setState({ socket: sockett(t,type,name) })
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
              x: "sdfsd",
              
             
            },
          }}
        />
      );
    }
  };
  
  render() {
    return (
      <div>
        <div>
          {this.Red()}
          <button onClick={this.gameStart}>
            {this.state.gameStart ? "Ждем опонента" : "Играть"}
          </button>
          <button>О игре</button>
          <button>Правила</button>
          <button>Выход</button>
        </div>

        <Game x={this.props.location.state.x}/>
      </div>
    );
  }
}
