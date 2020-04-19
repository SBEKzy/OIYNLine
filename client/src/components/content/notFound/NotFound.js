import React from "react";
import "./NotFound.css";
import notFound from './n404.png'
export default class NotFound extends React.Component {
  render() {
    return (
      <div className="notFound">
            <img src={notFound} alt="not found"/>
          <h2>Страница не существует</h2>
      </div>
    );
  }
}
