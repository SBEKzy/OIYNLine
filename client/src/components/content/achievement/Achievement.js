import React from "react";
import "./Achievement.css";
import { ResponsiveContainer, PieChart, Pie } from "recharts";
import axios from "axios";
export default class Achievement extends React.Component {
  state = {
    amount: 0,
    amountWin: 0,
    amountLose: 0,
    //game: {},
    levelUser: 0,
  };
  static jsfiddleUrl = "//jsfiddle.net/alidingling/6okmehja/";
  componentDidMount() {
    const id = parseInt(JSON.parse(localStorage.getItem("user_data")).id);
    axios
      .get(`http://localhost:8080/api/achievement/${id}`)
      .then((response) => {
        const a = response.data.data;
        console.log(a);
        const f = a.Game;
        console.log(f);
        this.setState({
          amount: a.Amount,
          amountWin: a.AmountWin,
          amountLose: a.AmountLose,
          game: Object.values(f),
          levelUser: a.LevelUser,
        });
      });
  }
  render() {
    const data = [
      { name: "Победа", value: this.state.amountWin },
      { name: "Поражения", value: this.state.amountLose },
    ];
    console.log(this.state);
    return (
      <div>
        <div className="achievement-content">
          <div className="achievement-content-item">
            <div className="achievement-content-item-header">Всего игр</div>
            <div className="achievement-content-item-body">
              <div className="achievement-content-item-body-des">
                <span>Всего сыграно игр - {this.state.amount}</span>
                <span>Побед - {this.state.amountWin}</span>
                <span>Поражения - {this.state.amountLose}</span>
                <span>Уровень - {this.state.levelUser}</span>
              </div>
              <div>
                <div style={{ width: 500, height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie dataKey="value" data={data} fill="#8884d8" label />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          <div className="achievement-content-center">
            <div className="achievement-content-item-header">
              Общая статистика
            </div>
            <table className="achievement-content-item-table">
              <tbody>
                <tr>
                  <td></td>
                  <td>Название</td>
                  <td>Кол-во игр</td>
                  <td>Кол-во побед</td>
                  <td>Кол-во поражений</td>
                  <td>Уровень</td>
                </tr>

                {this.state.game != null ? (
                  this.state.game.map((v, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{v.Name}</td>
                      <td>{v.Amount}</td>
                      <td>{v.AmountWin}</td>
                      <td>{v.AmountLose}</td>
                      <td>{v.LevelGame}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>1</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
