import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { setAxiosInterceptor } from "apis/axios";
import CreateArticle from "components/Article/CreateArticle";
import EditArticle from "components/Article/EditArticle";
import Container from "components/Common/Container";
import Dashboard from "components/Dashboard";
import Settings from "components/Settings";

const Main = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAxiosInterceptor();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Container loading={loading}>
          <Redirect exact from="/" to={{ pathname: "/home" }} />
          <Route
            exact
            path="/home"
            render={() => (
              <Dashboard setLoading={setLoading} loading={loading} />
            )}
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
          <Route
            exact
            path="/settings"
            render={() => (
              <Settings setLoading={setLoading} loading={loading} />
            )}
          />
        </Container>
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
