import React, { useEffect } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { setAxiosInterceptor } from "/apis/axios";

import Dashboard from "components/Dashboard";

const Main = () => {
  useEffect(() => {
    setAxiosInterceptor();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Dashboard />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
