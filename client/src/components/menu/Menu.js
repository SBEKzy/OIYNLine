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
            <a href="/my-games">Мой игры</a>
          </li>
          <li>
            <a href="/about">о Нас</a>
          </li>
        </nav>
      </div>
    );
  }
}
