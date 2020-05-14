import React from "react";
import "./Control.css";
import tictactoe from "../../../../img/tictactoe.png";
import Axios from "axios";
export default class Control extends React.Component {
  constructor() {
    super();
    this.state = {
      change: "Изменить",
      games: [],
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:8080/api/control").then((res) => {
      this.setState({ games: [...res.data.data] });
      console.log(this.state.games)
    });
  }

  change = () => {
    if (this.state.change === "Изменить") {
      this.setState({ change: "Сохранить" });
    } else {
      this.setState({ change: "Изменить" });
    }
  };

  render() {
    const changeStyle =
      this.state.change !== "Изменить" ? { display: "" } : { display: "none" };
    return (
      <div>
        <div className="control-game-items">
          {this.state.games.map((v) => (
            <div className="control-game-item" key={v.id}>
              <div className="control-game-item-header">
                <div className="control-game-item-des">
                  <div>
                    <img src={tictactoe} alt="" />
                  </div>
                  <div>
                    <span>{v.name}</span>
                  </div>
                </div>
                <div className="control-game-item-btns">
                  <div onClick={this.change}>{this.state.change}</div>
                  <div>Удалить</div>
                </div>
              </div>
              <div className="control-game-item-body" style={changeStyle}>
                <div>
                  <label htmlFor="">Название</label>
                  <input type="text" defaultValue={v.name}/>
                </div>
                <div>
                  <label htmlFor="">Описания</label>
                  <textarea name="" id="" cols="30" rows="10" defaultValue={v.description}></textarea>
                </div>
                <div>
                  <label htmlFor="">Правила</label>
                  <textarea name="" id="" cols="30" rows="10" defaultValue={v.rules}></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
