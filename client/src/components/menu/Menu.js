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
      <div
        className="sidebar"
        data-color="purple"
        data-background-color="white"
        data-image="../assets/img/sidebar-1.jpg"
      >
        <div className="logo">
          <Link to="/" className="simple-text logo-normal">
            OYINLine
          </Link>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li className="nav-item  ">
              <Link className="nav-link" to="/profile">
                <i className="material-icons">person</i>
                <p>{user}</p>
              </Link>
            </li>
            
            <li className="nav-item  ">
              <Link className="nav-link" to="/catalog">
                <i className="material-icons">dashboard</i>
                <p>Каталог</p>
              </Link>
            </li>
            <li className="nav-item  ">
              <Link className="nav-link" to="/my-games">
                <i className="material-icons">dashboard</i>
                <p>Мои игры</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
