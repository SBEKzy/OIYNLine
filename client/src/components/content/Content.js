import React from "react";


import Catalog from "./catalog/Catalog";
import Profile from "./profile/Profile";
import NotFound from "./notFound/NotFound";
import MyGames from "./myGames/MyGames";
import Account from "./account/Account";
import MainChat from "./mainChat/MainChat";
import {  Switch, Route } from "react-router-dom";
import TicTacToe from '../game/tictactoe/Game'
import TicTacToeMenu from '../game/tictactoe/menu/Menu'
import Achievement from "../content/achievement/Achievement"
import Video from "../content/video/Video"
import Main from "../content/main/Main"
import Control from "../content/admin/control/Control"

export default class Content extends React.Component {
  render() {
    return (
      <div className="content">      

        <Switch>
          <Route exact path="/login" component={Main} />
          <Route exact path="/catalog" component={Catalog} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/my-games" component={MyGames} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/tictactoe" component={TicTacToe} />
          <Route exact path="/tictactoe-menu" component={TicTacToeMenu} />
          <Route exact path="/achievement" component={Achievement} />
          <Route exact path="/chat" component={MainChat} />
          <Route exact path="/control" component={Control} />
          <Route exact path="/video" component={Video} />
          
          <Route exact path="" component={NotFound} />
        </Switch>
      </div>
    );
  }
}
