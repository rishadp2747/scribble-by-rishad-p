import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { setAxiosInterceptor } from "apis/axios";
import Container from "components/Common/Container";
import Dashboard from "components/Dashboard";
import CreateArticle from "components/Dashboard/Article/Create";
import EditArticle from "components/Dashboard/Article/Edit";
import SettingsRoute from "components/Dashboard/Settings/Route";
import Public from "components/Public";

const Main = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAxiosInterceptor();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/public/articles"
          render={() => <Public setLoading={setLoading} />}
        />
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />

        <Container loading={loading} title="Scribble">
          <Route
            exact
            path="/dashboard"
            render={() => <Dashboard setLoading={setLoading} />}
          />

          <Route
            exact
            path="/articles/creates"
            render={() => <CreateArticle setLoading={setLoading} />}
          />
          <Route
            exact
            path="/articles/:articleId/edit"
            render={() => <EditArticle setLoading={setLoading} />}
          />

          <Route
            path="/settings"
            render={() => <SettingsRoute setLoading={setLoading} />}
          />
        </Container>
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
