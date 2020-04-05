import React from "react";
import "./Login.css";
export default class Login extends React.Component {

    

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

          <form action="" className="register-form">
            <h2>Регистрация</h2>
            <input type="text" name="email" placeholder="Email" />
            <input type="text" name="username" placeholder="Никнейм" />
            <input type="password" name="password" placeholder="Пароль" />
            <input
              type="password"
              name="password"
              placeholder="Подверждение пароля"
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}
