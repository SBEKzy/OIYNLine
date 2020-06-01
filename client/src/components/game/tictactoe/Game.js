import React from "react";
import "./Game.css";
import Board from "./board/Board";
import {sockett} from "../../content/webscoket/Socket.js";
import axios from "axios";
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: this.props.location.state.x,
      socket : null,
    };
    
  }
  componentDidMount() {
    this.setState({ squares: this.state.squares });
    this.setState({socket : sockett})
    this.state.socket.onmessage = (msg) => {
      console.log(msg);
      this.ch(msg)
    };
    //this.state.socket.connect(this.ch)
  }
  componentWillUnmount(){
    this.state.socket.close()
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
    this.state.socket.send(square);//----------------
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
          <div className="status">Вы играете за {status}</div>
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
