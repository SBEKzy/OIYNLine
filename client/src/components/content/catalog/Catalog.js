import React from "react";
import "./Catalog.css";
import tictactoe from './img/tictactoe.png'
import { Link } from 'react-router-dom';
import {MyContext} from '../../../context/MyContext'
export default class Catalog extends React.Component {
  static contextType = MyContext
  render() {
    return (
      <div className="catalog">
      <h3>{this.context.Auth.isAuthenticated ? "" : "Авторизуйтесь пожалуйста, без авторизации вы не можете запускать игры"}</h3>
        <div className="game-items">
          <div className="game-item">
            <img src={tictactoe} alt=""/>
            <h3>{!this.context.Auth.isAuthenticated ? <Link to="/login">Крестики-нолики</Link>  : <Link to="/tictactoe-menu">Крестики-нолики</Link>}</h3>
          </div>
          <div className="game-item">
            <img src={tictactoe} alt=""/>
            <h3>Крестики-нолики</h3>
          </div>
        </div>       
      </div>
    );
  }
}
