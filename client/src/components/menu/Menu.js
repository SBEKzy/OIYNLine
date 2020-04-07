import React from "react";
import "./Menu.css";
import { Link } from 'react-router-dom';
export default class Menu extends React.Component {
  render() {
    return (
      <div className="Menu">
        <h1>OYINLine</h1>
        <nav>
          <li>
            <Link to="/login">Войти</Link>
          </li>
          <li>
            <Link to="/">Каталог игр</Link>
          </li>
          <li>
            <Link to="/my-games">Мой игры</Link>
          </li>
          <li>
            <Link to="/account">BEKzy</Link>
          </li>
        </nav>
      </div>
    );
  }
}
