import React from "react";
import "./InfoAccount.css";
import done from "../../../../img/done.png";
import axios from "axios";
export default class InfoAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
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
        this.setState({ username: user.username, email: user.email });
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
        password: e.target.elements[2].value,
        id: g.id,
      };
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
      disabled: !this.state.disabled,
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
      <div className="info-account">
        <form
          action=""
          className="info-account-form"
          onSubmit={this.submitFrom}
        >
          <div className="flex-dir-column">
            <label htmlFor="">Username:</label>
            <div className="input-img">
              <input
                type="text"
                disabled={this.state.disabled ? "disabled" : ""}
                defaultValue={this.state.username}
                onChange={this.changeInput}
                name="username"
              />
              <span>
                <img
                  src={done}
                  alt="done"
                  className="done-img"
                  onClick={() => this.clickImg(true)}
                />
              </span>
            </div>
            {username}
          </div>
          <div className="flex-dir-column">
            <label htmlFor="">Email:</label>
            <div className="input-img">
              <input
                type="text"
                disabled={this.state.disabled ? "disabled" : ""}
                defaultValue={this.state.email}
                onChange={this.changeInput}
                name="email"
              />
              <span>
                <img
                  src={done}
                  alt="done"
                  className="done-img"
                  onClick={() => this.clickImg(false)}
                />
              </span>
            </div>
            {email}
          </div>
          <div className="flex-dir-column">
            <label htmlFor="">Password:</label>
            <input
              type="text"
              disabled={this.state.disabled ? "disabled" : ""}
            />
          </div>
          <div className="btns">
            <input
              type="submit"
              value={!this.state.change ? "Изменить" : "Сохранить"}
              disabled={
                this.state.change
                  ? this.state.save1 && this.state.save2
                    ? ""
                    : "disabled"
                  : ""
              }
              
            />
            {this.state.change ? (
              <input type="button" value="Отмена" onClick={this.cancelButton} />
            ) : (
              ""
            )}
          </div>
        </form>
        <div className="logout" onClick={this.props.lout}>
          Выход
        </div>
      </div>
    );
  }
}
