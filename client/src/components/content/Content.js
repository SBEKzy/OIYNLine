import React from "react";
import "./Content.css";

import Catalog from "./catalog/Catalog";
import Login from "./login/Login";
import NotFound from "./notFound/NotFound";
import MyGames from "./myGames/MyGames";
import Account from "./account/Account";
import {  Switch, Route } from "react-router-dom";
import TicTacToe from '../game/tictactoe/Game'
import TicTacToeMenu from '../game/tictactoe/menu/Menu'


export default class Content extends React.Component {
  render() {
    return (
      <div className="content">
        <h1 className="content-header">Каталог игр</h1>

        <Switch>
          <Route exact path="/" component={Catalog} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/my-games" component={MyGames} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/tictactoe" component={TicTacToe} />
          <Route exact path="/tictactoe-menu" component={TicTacToeMenu} />
          
          <Route exact path="" component={NotFound} />
        </Switch>
      </div>
    );
  }
}
