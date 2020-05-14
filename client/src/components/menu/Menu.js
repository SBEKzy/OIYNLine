import React from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
export default class Menu extends React.Component {
  // componentDidMount(){
  //   this.setState({isAuth : this.props.isAuth});
  // }
  static contextType = MyContext;
  render() {
    let user = "";
    if (this.context.Auth.isAuthenticated) {
      user = JSON.parse(localStorage.getItem("user_data")).username;
    }
    return (
      <div className="Menu">
        <h1>OYINLine</h1>
        <nav>
          <li>
            {!this.context.Auth.isAuthenticated ? (
              <Link to="/login">Войти</Link>
            ) : (
              <Link to="/account">{user}</Link>
            )}
          </li>
          <li>
            <Link to="/">Каталог игр</Link>
          </li>
          <li>
            {this.context.Auth.isAuthenticated &&
            JSON.parse(this.context.Auth.user).role == "user" ? (
              <Link to="/my-games">Мой игры</Link>
            ) : (
              ""
            )}
          </li>
          <li>
            {this.context.Auth.isAuthenticated ? (
              <Link to="/chat">Сообщество</Link>
            ) : (
              ""
            )}
          </li>
          <li>
            {this.context.Auth.isAuthenticated &&
            JSON.parse(this.context.Auth.user).role == "user" ? (
              <Link to="/achievement">Достижение</Link>
            ) : (
              ""
            )}
          </li>
          <li>
            {this.context.Auth.isAuthenticated &&
            JSON.parse(this.context.Auth.user).role == "admin" ? (
              <Link to="/control">Управление</Link>
            ) : (
              ""
            )}
          </li>
          <li>
            <Link to="/video">video</Link>
          </li>
        </nav>
      </div>
    );
  }
}
