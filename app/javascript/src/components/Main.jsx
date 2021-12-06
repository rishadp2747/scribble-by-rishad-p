import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { setAxiosInterceptor } from "apis/axios";
import CreateArticle from "components/Article/CreateArticle";
import EditArticle from "components/Article/EditArticle";
import Container from "components/Common/Container";
import Dashboard from "components/Dashboard";
import SettingsContainer from "components/Settings/Container";
import GeneralSettings from "components/Settings/General";

const Main = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAxiosInterceptor();
  }, []);

  return (
    <BrowserRouter>
      <Container loading={loading}>
        <Switch>
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
          <Redirect exact from="/" to={{ pathname: "/home" }} />
          <Redirect
            exact
            strict
            from="/settings"
            to={{ pathname: "/settings/general" }}
          />
          <SettingsContainer>
            <Route
              exact
              path="/settings/general"
              render={() => (
                <GeneralSettings setLoading={setLoading} loading={loading} />
              )}
            />
          </SettingsContainer>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default Main;
