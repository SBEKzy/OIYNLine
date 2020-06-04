import React from "react";
import "./MyGames.css";
import axios from "axios";
import { MyContext } from "../../../context/MyContext";
import Game from "../game/Game";
export default class MyGames extends React.Component {
  constructor() {
    super();
    this.state = {
      myGames: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:8080/api/my-games/" +
          JSON.parse(this.context.Auth.user).id
      )
      .then((response) => {
        this.setState({ myGames: Object.values(response.data.data) });
      });
  }
  static contextType = MyContext;
  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            {this.state.myGames.map((v, i) => (
              <Game
                auth={this.context.Auth.isAuthenticated}
                name={v}
                key={i}
                price={0}
                gameId={i}
                userId={this.context.Auth.user}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
