import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { setAxiosInterceptor } from "apis/axios";
import CreateArticle from "components/Article/CreateArticle";
import EditArticle from "components/Article/EditArticle";
import Container from "components/Common/Container";
import Dashboard from "components/Dashboard";
import Public from "components/Public";

import SettingsRoute from "./Settings/Route";

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
        {/* <Route
          exact
          path="/public/articles/:slug/show/"
          render={() => <Public setLoading={setLoading} />}
        /> */}

        {/* <Route
          path="/public"
          render={() => <Public setLoading={setLoading} />}
        /> */}

        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        {/* {REDIRECTION_ROUTES} */}

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
