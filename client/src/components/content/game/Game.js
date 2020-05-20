import React from "react";
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
      user_data: "" && JSON.parse(this.props.userId).id,
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
      styleGame = { color: "red" };
    } else {
      styleGame = { color: "" };
    }
    return (
      <div class="card card-stats" style={{ width: "400px" }}>
        <div class="card-header card-header-info card-header-icon">
          <div class="card-icon">
            <img src={tictactoe} alt="" />
          </div>
          <p class="card-category">логические</p>
          <h3 class="card-title">{this.props.name}</h3>
        </div>
        <div class="card-footer">
          <div class="stats">
            <i class="material-icons text-danger">access_time</i>
            <Link to="/tictactoe-menu">Играть</Link>
          </div>
          <div class="stats">
            <i class="material-icons text-danger">heart</i>
            <Link to="#" onClick={this.imgClick} style={styleGame}>Нравится</Link>
          </div>
        </div>
      </div>
    );
  }
}
