import React from "react";
import "./Game.css";
import Board from "./board/Board";
import { sendMsg, socket } from "../../content/webscoket/Socket";
import axios from "axios";
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: this.props.location.state.x,
    };
    socket.onmessage = this.ch;
  }
  componentDidMount() {
    this.setState({ squares: this.state.squares });
  }
  game = {
    flag: false,
  };
  ch = (msg) => {
    const p = JSON.parse(msg.data);

    this.setState({
      squares: p.body,
    });
  };
  handleClick = (i) => {
    let square = this.state.squares;
    if (calculateWinner(square) || square[i]) {
      return;
    }
    square[i] = this.state.xIsNext ? "X" : "O";
    sendMsg(square);
  };

  gameover = () => {
    this.game.flag = true;
    const data = {
      result: "",
      gamer: parseInt(JSON.parse(localStorage.getItem("user_data")).id),
      game: 1,
    };

    if (this.state.xIsNext && calculateWinner(this.state.squares) === "X") {
      data.result = "win";
      axios.post("http://localhost:8080/api/resultgame", data);
    } else {
      data.result = "lose";
      axios.post("http://localhost:8080/api/resultgame", data);
    }
  };
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (calculateWinner(this.state.squares) && !this.game.flag) {
      this.gameover();
    }
    status = "" + (this.state.xIsNext ? "X" : "O");

    return (
      <div className="game">
        <h1>Крестики нолики</h1>
        <div className="info">
          <div className="status">{status}</div>
          {winner ? <div className="result">Победил : {winner}</div> : ""}
        </div>
        <Board
          handleClick={(i) => this.handleClick(i)}
          squares={this.state.squares}
        />
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
