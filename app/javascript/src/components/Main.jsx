import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { setAxiosInterceptor } from "apis/axios";
import CreateArticle from "components/Article/CreateArticle";
import EditArticle from "components/Article/EditArticle";
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
          path="/articles/creates"
          render={() => (
            <CreateArticle setLoading={setLoading} loading={loading} />
          )}
        />
        <Route
          exact
          path="/articles/:articleId/edit"
          render={() => (
            <EditArticle setLoading={setLoading} loading={loading} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
