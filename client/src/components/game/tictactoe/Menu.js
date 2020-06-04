import React from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import Axios from "axios";
export default class Menu extends React.Component {
  
  state = {
    gameStart: false,
    redirect: false,
    x: false,
    socket: null,
    pools: [],
  };
  componentDidMount() {
     
    Axios.get("http://localhost:8080/api/tictactoe-menu").then((res) => {
      console.log("ffffffffffffffffffffffffff", res.data.data); // friend id ala alam
      if (res.data.data === undefined || res.data.data === null) {
        this.setState({ pools: [] });
      } else {
        this.setState({ pools: [...res.data.data] });
      }
      if (res.data.livepool === undefined || res.data.livepool === null) {
        this.setState({ livepools: [] });
      } else {
        this.setState({ livepools: [...res.data.livepool] });
      }
    });
  }
  creatclc = () => {
    Axios.get("http://localhost:8080/api/tictactoe-menu/te3?type=create").then(
      (res) => {
        console.log("ffffffffffffffffffffffffff", res.data.data); // friend id ala alam
      }
    );
  };
  render() {
    const s4 = () => Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    const s5 = s4()+s4()
    return (
      <div>
        <div>
          <Link
            to={{
              pathname: `/tictactoe-menu/${s5}`,
              state: {
                type: "create",
                name: s5,
                x : false,
              },
            }}
          >
            Создать
          </Link>
        </div>
        <div>
          FreePool
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class="">
                <th>Название комнаты</th>
                <th>Игрок 1</th>
                <th>Игрок 2</th>
                <th>Число игроков</th>
                <th>Присоединиться</th>
              </thead>
              <tbody>
                {this.state.pools != null ? (
                  this.state.pools.map((v, i) => (
                    <tr key={i}>
                      <td>{v.name}</td>
                      <td>{v.player1}</td>
                      <td>{v.player2}</td>
                      <td>{v.playercount}</td>
                      <td>
                        {
                          <Link
                            to={{
                              pathname: `/tictactoe-menu/${v.name}`,
                              state: {
                                type: "join",
                                name: v.name,
                                x : true,
                              },
                            }}
                          >
                            Присоединиться
                          </Link>
                        }
                      </td>
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
          <div>
          LivePool
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class="">
                <th>Название комнаты</th>
                <th>Игрок 1</th>
                <th>Игрок 2</th>
                <th>Число игроков</th>
                <th>Статуы</th>
              </thead>
              <tbody>
                {this.state.livepools != null ? (
                  this.state.livepools.map((v, i) => (
                    <tr key={i}>
                      <td>{v.name}</td>
                      <td>{v.player1}</td>
                      <td>{v.player2}</td>
                      <td>{v.playercount}</td>
                      <td>В игре</td>
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
    );
  }
}
