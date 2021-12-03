import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { setAxiosInterceptor } from "apis/axios";
import CreateArticle from "components/Article/CreateArticle";
import Dashboard from "components/Dashboard";

const Main = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAxiosInterceptor();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Dashboard setLoading={setLoading} loading={loading} />}
        />
        <Route
          exact
          path="/articles/create"
          render={() => (
            <CreateArticle setLoading={setLoading} loading={loading} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
