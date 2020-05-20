import React from "react";
import axios from "axios";
export default class Login extends React.Component {
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
    // const g = JSON.parse(this.props.context.Auth.user);

    // axios
    //   .get("http://localhost:8080/api/account/" + g.username)
    //   .then((response) => {
    //     const user = response.data.user;
    //     this.setState({ username: user.username, email: user.email });
    //   });
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header card-header-primary">
                <h4 className="card-title">Профиль</h4>
                <p className="card-category">Профильді толық жазыңыз</p>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="bmd-label-floating">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          disabled={this.state.disabled ? "disabled" : ""}
                          defaultValue={this.state.username}
                          onChange={this.changeInput}
                          name="username"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">
                          Email
                        </label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Имя</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Фамилия</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">Пароль</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">Подверждение пароля</label>
                        <input type="text" className="form-control" />
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
                  <button type="submit" className="btn btn-primary pull-right">
                    Update Profile
                  </button>
                  <div className="clearfix"></div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-profile">
              <div className="card-avatar">
                <a href="javascript:;">
                  <img className="img" src="../assets/img/faces/marc.jpg" />
                </a>
              </div>
              <div className="card-body">
                <h6 className="card-category text-gray">CEO / Co-Founder</h6>
                <h4 className="card-title">Alec Thompson</h4>
                <p className="card-description">
                  Don't be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </p>
                <a href="javascript:;" className="btn btn-primary btn-round">
                  Follow
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
