import React from "react";
import "./Login.css";
//import { useSelector, useDispatch } from "react-redux";
export default class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password : ''

    }
  }

  

  registerSubmit = (e) => {
    e.preventDefault();
    let email = e.target.elements['email'].value;
    let pass = e.target.elements['password'].value;
    let username = e.target.elements['username'].value;
    let reg = {
      email : email,
      password : pass,
      username : username
    };
    let data = fetch('http://localhost:8080/login',{
      method: 'post',
      body: JSON.stringify(reg)
    }).then(response => response.json());
    
    console.log(data);
  }

  render() {
    return (
      <div className="login">
        <div className="login-forms">
          <form action="" className="login-form">
            <h2>Войти</h2>
            <input type="text" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="Пароль" />
            <input type="submit" />
          </form>

          <form action="/login" className="register-form" onSubmit={this.registerSubmit}>
            <h2>Регистрация</h2>
            <input type="text" name="email" placeholder="Email" />
            <input type="text" name="username" placeholder="Никнейм" />
            <input type="password" name="password" placeholder="Пароль" />
            <input
              type="password"
             
              placeholder="Подверждение пароля"
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}
