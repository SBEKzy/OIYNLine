import React from "react";
import "./MyGames.css";
import axios from 'axios'
export default class MyGames extends React.Component {
  render() {
    const bbb = () => {
        axios.get("http://localhost:8080/api/my-games").then(response =>
            console.log(response)
        )
    }
    return (
      <div className="myGames">
        <h1>My games</h1>
        <button onClick={bbb}> ok</button>
      </div>
    );
  }
}
