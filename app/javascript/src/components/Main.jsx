import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from "components/Dashboard";

const Main = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" render={() => <Dashboard />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
