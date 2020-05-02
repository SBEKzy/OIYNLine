import React from "react";
import "./Square.css";

export default class Square extends React.Component {
  render() {
    return (
      <div className="square" onClick={this.props.click}>
        <span>{this.props.square}</span>
      </div>
    );
  }
}
