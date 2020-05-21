import React from "react";

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
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-plain">
              <div class="card-header card-header-primary">
                <h4 class="card-title mt-0"> Достижение</h4>
                <p class="card-category">Таблица достижение</p>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead class="">
                      <th>Название</th>
                      <th>Кол-во игр</th>
                      <th>Кол-во побед</th>
                      <th>Кол-во поражений</th>
                      <th>Уровень</th>
                    </thead>
                    <tbody>

                      {this.state.game != null ? (
                  this.state.game.map((v, i) => (
                    <tr key={i}>
                      <td>{v.Name}</td>
                      <td>{v.Amount}</td>
                      <td>{v.AmountWin}</td>
                      <td>{v.AmountLose}</td>
                      <td>{v.LevelGame}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
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
          </div>
        </div>
      </div>
    );
  }
}
