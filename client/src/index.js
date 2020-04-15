import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {setAuthorizationToken} from './authorization/Authorization'
if (localStorage.token){
  setAuthorizationToken(localStorage.token) 
  let userData = localStorage.getItem('user_data') == null ? null : JSON.parse(localStorage.getItem('user_data'))

}

export const AuthContext = React.createContext();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
