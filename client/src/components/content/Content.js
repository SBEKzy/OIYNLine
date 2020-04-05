import React from "react";
import "./Content.css";

import Catalog from "./catalog/Catalog";
import Login from "./login/Login";
import NotFound from "./notFound/NotFound";
import {  Switch, Route } from "react-router-dom";

export default class Content extends React.Component {
  render() {
    return (
      <div className="content">
        <h1 className="content-header">Каталог игр</h1>

        <Switch>
          <Route exact path="/" component={Catalog} />
          <Route exact path="/login" component={Login} />
          <Route exact path="" component={NotFound} />
        </Switch>
      </div>
    );
  }
}
