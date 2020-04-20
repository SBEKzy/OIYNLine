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
    /*console.log(this.context.Auth.users)*/
  }

  submitFrom = (e) => {
    e.preventDefault();
    if (this.state.change) {
      console.log("send");     
      const g = JSON.parse(this.props.context.Auth.user);    
      const data = {
        username : e.target.elements[0].value, // todo: with name
        email : e.target.elements[1].value,
        id : g.id
      }
      axios.put("http://localhost:8080/api/account", data).then(response => {
        console.log(response.data)
        console.log(response.data.user)
        localStorage.setItem("user_data", JSON.stringify(response.data.user));
        this.props.context.setAuth("LOGIN");
      })
    }
    this.setState({
      disabled: !this.state.disabled,
      change: !this.state.change,
    });
  };

  cancelButton = () => {
    this.setState({
      disabled: !this.state.disabled,
      change: !this.state.change,
    });
  };
  render() {
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
              />
              <span>
                <img src={done} alt="done" className="done-img" />
              </span>
            </div>
          </div>
          <div className="flex-dir-column">
            <label htmlFor="">Email:</label>
            <div className="input-img">
              <input
                type="text"
                disabled={this.state.disabled ? "disabled" : ""}
                defaultValue={this.state.email}
              />
              <span>
                <img src={done} alt="done" className="done-img" />
              </span>
            </div>
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
