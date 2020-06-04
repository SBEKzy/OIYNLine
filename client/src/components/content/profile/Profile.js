import React from "react";
import axios from "axios";
import "./Profile.css";
import rank from "./rank.png";
import Achievement from "../achievement/Achievement";
import AchiDiagram from "../achievement/AchiDiagram";
import { PieChart, Pie, Sector } from "recharts";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      change: false,
      usernameExist: "",
      emailExist: "",
      save1: false,
      save2: false,
    };
  }

  componentDidMount() {
    const g = JSON.parse(this.props.context.Auth.user);

    axios
      .get("http://localhost:8080/api/account/" + g.username)
      .then((response) => {
        const user = response.data.user;
        this.setState({
          username: user.username,
          email: user.email,
          name: user.name,
          lastname: user.lastname,
        });
      });
  }

  submitFrom = (e) => {
    e.preventDefault();
    if (this.state.change) {
      console.log("send");
      const g = JSON.parse(this.props.context.Auth.user);
      const data = {
        username: e.target.elements[0].value, // todo: with name
        email: e.target.elements[1].value,
        name: e.target.elements[2].value,
        lastname: e.target.elements[3].value,
        password: e.target.elements[4].value,
        des: e.target.elements[6].value,
        id: g.id,
      };
      console.log(data);
      axios.put("http://localhost:8080/api/account", data).then((response) => {
        localStorage.setItem("user_data", JSON.stringify(response.data.user));
        this.props.context.setAuth("LOGIN");
      });
    }
    this.setState({
      disabled: !this.state.disabled,
      change: !this.state.change,
      usernameExist: "",
      emailExist: "",
    });
  };

  cancelButton = () => {
    this.setState({
      display: !this.state.display,
      change: !this.state.change,
    });
  };

  clickImg = (flag) => {
    let data;
    if (flag) {
      data = {
        username: this.state.username,
        email: "",
      };
    } else {
      data = {
        email: this.state.email,
        username: "",
      };
    }

    axios
      .post("http://localhost:8080/api/accountcheck", data)
      .then((response) => {
        console.log(response);
        if (response.data.res === "EXIST") {
          this.setState(
            flag
              ? { usernameExist: "exist", save1: false }
              : { emailExist: "exist", save2: false }
          );
        } else if (response.data.res === "NOTEXIST") {
          this.setState(
            flag
              ? { usernameExist: "not", save1: true }
              : { emailExist: "not", save2: true }
          );
        }
      });
  };

  changeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let username = "";
    if (this.state.usernameExist === "exist") {
      username = (
        <div style={{ color: "red" }}>Данный акканут зарегестрирован</div>
      );
    } else if (this.state.usernameExist === "not") {
      username = <div style={{ color: "green" }}>Все хорошо</div>;
    }

    let email = "";
    if (this.state.emailExist === "exist") {
      email = <div style={{ color: "red" }}>Данный email зарегестрирован</div>;
    } else if (this.state.emailExist === "not") {
      email = <div style={{ color: "green" }}>Все хорошо</div>;
    }

    return (
      <div className="container-fluid profilee">
        <div className="row">
          <div className="col-md-4">
            <div className="card card-profile">
              <div className="card-avatar">
                <a href="javascript:;">
                  <img className="img" src="../assets/img/faces/marc.jpg" />
                </a>
              </div>
              <div className="card-body">
                <h4 className="card-title">Никнейм : {this.state.username}</h4>
                <h4 className="card-title">Почта : {this.state.email}</h4>
                <h4 className="card-title">Имя : {this.state.name}</h4>
                <h4 className="card-title">Фамилия : {this.state.lastname}</h4>
                <div>
                  <div>
                    Уровень [1] <br />
                    [Новобранец]
                  </div>
                  <div>
                    <img src={rank} alt="" />
                  </div>
                </div>
                <a
                  href="javascript:;"
                  className="btn btn-primary btn-round"
                  onClick={this.cancelButton}
                >
                  {!this.state.change ? "Изменить" : "Отмена"}
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div
              className="card bekcard"
              style={
                !this.state.display ? { display: "none" } : { display: "" }
              }
            >
              <h4>О себе</h4>
              <div>
                Меня зовут Ивонна, хочу работать писателем в вашем деловом СМИ.
                Пишу для интернет-журналов с 2010 года. Лучшие работы:.. Есть
                опыт в бизнес-темах: в прошлом году писала статьи для делового
                журнала «...». Темы — финансы, управление... Лучшие статьи:..
                Как узнать подробнее о задаче? Если есть тестовое задание, буду
                рада попробовать.
              </div>
            </div>
            <div
              className="card"
              style={this.state.display ? { display: "none" } : { display: "" }}
            >
              <div className="card-header card-header-primary">
                <h4 className="card-title">Профиль</h4>
                <p className="card-category">Профильді толық жазыңыз</p>
              </div>
              <div className="card-body">
                <form onSubmit={this.submitFrom}>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="bmd-label-floating">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={this.changeInput}
                          name="username"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={this.changeInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Имя</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          onChange={this.changeInput}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Фамилия</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastname"
                          onChange={this.changeInput}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">Пароль</label>
                        <input
                          type="text"
                          className="form-control"
                          name="password"
                          onChange={this.changeInput}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">
                          Подверждение пароля
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="password2"
                          onChange={this.changeInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>О себе</label>
                        <div className="form-group">
                          <label className="bmd-label-floating">
                            Раскажите немного о себе...
                          </label>
                          <textarea
                            className="form-control"
                            rows="5"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary pull-right"
                    value=" Изменить данные"
                  />

                  <div className="clearfix"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="topgames-header">Топ 3 игр</p>
          </div>
        </div>
        <div className="row diagrams-body">
          <div className="col-md-4 diagram">
            <div>
              <AchiDiagram
                numWins={3}
                numLoses={3}
                numDraw={0}
                fill="#8884d8"
              />
            </div>
            <div className="diagram-header">Крестики-нолики</div>
          </div>
          <div className="col-md-4 diagram">
            <div>
              <AchiDiagram
                numWins={1}
                numLoses={2}
                numDraw={3}
                fill="#10e348"
              />
            </div>
            <div className="diagram-header">Го</div>
          </div>
          <div className="col-md-4 diagram">
            <div>
              <AchiDiagram
                numWins={1}
                numLoses={1}
                numDraw={2}
                fill="#e310a4"
              />
            </div>
            <div className="diagram-header">Уно</div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <Achievement />
          </div>
        </div>
      </div>
    );
  }
}
