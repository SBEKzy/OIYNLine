import React from "react";
import './App.css'
import Menu from "./components/menu/Menu";
import Content from './components/content/Content'
import {
  BrowserRouter as Router
  
} from "react-router-dom";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>       
          <Menu />
          <Content />
        </Router>
      </div>
    );
  }
}
