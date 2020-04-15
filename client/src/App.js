import React from "react";
import "./App.css";
import Menu from "./components/menu/Menu";
import Content from "./components/content/Content";
import {MyContext} from './context/MyContext'
import { BrowserRouter as Router } from "react-router-dom";

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
      setAuth : this.setAuth,
    };
    if (localStorage.getItem("token")) {
  
      this.state = {
        Auth: {
          isAuthenticated: true,
          user: localStorage.getItem('user_data'),
        },
        setAuth : this.setAuth,
      };
    };
  }

  

  setAuth = (dis) => {
    switch (dis) {
      case "LOGIN":
        console.log("LOGIN swith")
        this.setState({
          Auth: {
            isAuthenticated: true,
            user: localStorage.getItem("user_data"),
          }
        });
        return
      case "LOGOUT":        
        this.setState({
          Auth: {
            isAuthenticated: false,
            user: null,
          },
        });
        return
    }
  };
  
  render() {
    return (
      <MyContext.Provider value={this.state}>
        <Router>
          <Menu />
          <Content />
        </Router>
      </MyContext.Provider>
    );
  }
}
