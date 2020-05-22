import React from "react";

import Game from "../game/Game";
import { MyContext } from "../../../context/MyContext";

import axios from "axios";
export default class Catalog extends React.Component {
  constructor() {
    super();
    this.state = {
      catalog: [],
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8080/api/catalog").then((response) => {
      console.log(response.data.data);

      this.setState({ catalog: Object.values(response.data.data) });
    });
    console.log("qwerty-", this.state.catalog);
  }
  static contextType = MyContext;
  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            {this.state.catalog.map((v, i) => (
              <Game
                auth={this.context.Auth.isAuthenticated}
                name={v}
                key={i}
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
