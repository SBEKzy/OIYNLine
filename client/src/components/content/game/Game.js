import React from "react";
import "./Game.css";
import tictactoe from "../../../img/tictactoe.png";
import { Link } from "react-router-dom";
import heart from "../../../img/heart.png";
import Axios from "axios";
export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      added: false,
    };
  }
  componentDidMount() {
    const data = {
      gameId: this.props.name,
      user_data: JSON.parse(this.props.userId).id,
    };
    Axios.post("http://localhost:8080/api/ismygames", data).then((response) => {
      this.setState({ added: response.data.data });
    });
  }
  imgClick = () => {
    const data = {
      gameId: this.props.name,
      user_data: JSON.parse(this.props.userId).id,
    };
    if (this.state.added) {
      Axios.delete(
        "http://localhost:8080/api/my-games/" +
          data.gameId +
          "/" +
          data.user_data
      );
    } else {
      Axios.post("http://localhost:8080/api/my-games", data);
    }
    this.setState({ added: !this.state.added });
  };
  render() {
    let styleGame;
    if (this.state.added) {
      styleGame = { boxShadow: "1px 1px 10px 1px red" };
    } else {
      styleGame = { boxShadow: "1px 1px 10px 1px black" };
    }
    return (
      <div className="game-item" style={styleGame}>
        <img src={tictactoe} alt="" className="game-logo" />
        <h3>
          {!this.props.auth ? (
            <Link to="/login">{this.props.name}</Link>
          ) : (
            <Link to="/tictactoe-menu">{this.props.name}</Link>
          )}
        </h3>
        <img src={heart} alt="" className="img-heart" onClick={this.imgClick} />
      </div>
    );
  }
}
