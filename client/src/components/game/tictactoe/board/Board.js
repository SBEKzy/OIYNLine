import React from "react";
import "./Board.css";
import Square from "../square/Square";
export default class Board extends React.Component {

  render() {
    return (
      <div className="game-board">
        <div>
          <Square click = {() => this.props.handleClick(0)} square={this.props.squares[0]}/>
          <Square click = {() => this.props.handleClick(1)} square={this.props.squares[1]}/>
          <Square click = {() => this.props.handleClick(2)} square={this.props.squares[2]}/>
        </div>
        <div>
          <Square click = {() => this.props.handleClick(3)} square={this.props.squares[3]}/>
          <Square click = {() => this.props.handleClick(4)} square={this.props.squares[4]}/>
          <Square click = {() => this.props.handleClick(5)} square={this.props.squares[5]}/>
        </div>
        <div>
          <Square click = {() => this.props.handleClick(6)} square={this.props.squares[6]}/>
          <Square click = {() => this.props.handleClick(7)} square={this.props.squares[7]}/>
          <Square click = {() => this.props.handleClick(8)} square={this.props.squares[8]}/>
        </div>
      </div>
    );
  }
}
