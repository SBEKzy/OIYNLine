import React from "react";
import "./App.css";
import Menu from "./components/menu/Menu";
import Content from "./components/content/Content";
import { MyContext } from "./context/MyContext";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/content/main/Main";
// const reducer = (state, action) =>{
//   switch(action.type){
//     case 'LOGIN':
//       localStorage.setItem('user', JSON.stringify(action.payload.user))
//       localStorage.setItem('token', JSON.stringify(action.payload.token))
//       return {
//         ...state,
//         isAuthenticated : true,
//         user : action.payload.user,
//         token : action.payload.token
//       };
//       case 'LOGOUT':
//         localStorage.clear();
//         return {
//           ...state,
//         isAuthenticated : false,
//         user : null,
//         token : null
//         };
//         default :
//         return state;
//   }
// }

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      Auth: {
        isAuthenticated: false,
        user: null,
      },
      setAuth: this.setAuth,
    };
    if (localStorage.getItem("token")) {
      this.state = {
        Auth: {
          isAuthenticated: true,
          user: localStorage.getItem("user_data"),
        },
        setAuth: this.setAuth,
      };
    }
  }

  setAuth = (dis) => {
    switch (dis) {
      case "LOGIN":
        console.log("LOGIN swith");
        this.setState({
          Auth: {
            isAuthenticated: true,
            user: localStorage.getItem("user_data"),
          },
        });
        return;
      case "LOGOUT":
        this.setState({
          Auth: {
            isAuthenticated: false,
            user: null,
          },
        });
        return;
      default:
        this.setState({
          Auth: {
            isAuthenticated: false,
            user: null,
          },
        });
        return;
    }
  };

  render() {
    return (
      <MyContext.Provider value={this.state}>
        <Router>
          {!this.state.Auth.isAuthenticated ? (
            <Main />
          ) : (
            <div className="">
              <div className="wrapper ">
                <Menu />
                {/* <Content /> */}

                <div className="main-panel">
                  {/* <!-- Navbar --> */}
                  <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                    <div className="container-fluid">
                      <div className="navbar-wrapper">
                        <a className="navbar-brand" href="javascript:;">
                          User Profile
                        </a>
                      </div>
                      <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        aria-controls="navigation-index"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                      </button>
                      <div className="collapse navbar-collapse justify-content-end">
                        <form className="navbar-form">
                          <div className="input-group no-border">
                            <input
                              type="text"
                              value=""
                              className="form-control"
                              placeholder="Search..."
                            />
                            <button
                              type="submit"
                              className="btn btn-white btn-round btn-just-icon"
                            >
                              <i className="material-icons">search</i>
                              <div className="ripple-container"></div>
                            </button>
                          </div>
                        </form>
                        <ul className="navbar-nav">
                          <li className="nav-item">
                            <a className="nav-link" href="javascript:;">
                              <i className="material-icons">dashboard</i>
                              <p className="d-lg-none d-md-block">Stats</p>
                            </a>
                          </li>
                          <li className="nav-item dropdown">
                            <a
                              className="nav-link"
                              href="http://example.com"
                              id="navbarDropdownMenuLink"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="material-icons">notifications</i>
                              <span className="notification">5</span>
                              <p className="d-lg-none d-md-block">Some Actions</p>
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-right"
                              aria-labelledby="navbarDropdownMenuLink"
                            >
                              <a className="dropdown-item" href="#">
                                Mike John responded to your email
                              </a>
                              <a className="dropdown-item" href="#">
                                You have 5 new tasks
                              </a>
                              <a className="dropdown-item" href="#">
                                You're now friend with Andrew
                              </a>
                              <a className="dropdown-item" href="#">
                                Another Notification
                              </a>
                              <a className="dropdown-item" href="#">
                                Another One
                              </a>
                            </div>
                          </li>
                          <li className="nav-item dropdown">
                            <a
                              className="nav-link"
                              href="javascript:;"
                              id="navbarDropdownProfile"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="material-icons">person</i>
                              <p className="d-lg-none d-md-block">Account</p>
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-right"
                              aria-labelledby="navbarDropdownProfile"
                            >
                              <a className="dropdown-item" href="#">
                                Profile
                              </a>
                              <a className="dropdown-item" href="#">
                                Settings
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#">
                                Log out
                              </a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                  {/* <!-- End Navbar --> */}
                  <Content />
                </div>
              </div>
            </div>
          )}
        </Router>
      </MyContext.Provider>
    );
  }
}
