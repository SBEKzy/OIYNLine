import React from "react";
import "./Catalog.css";
import tictactoe from './img/tictactoe.png'
import { Link } from 'react-router-dom';
export default class Catalog extends React.Component {
  render() {
    return (
      <div className="catalog">
        <div className="game-items">
          <div className="game-item">
            <img src={tictactoe} alt=""/>
            <h3><Link to="/tictactoe">Крестики-нолики</Link></h3>
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
