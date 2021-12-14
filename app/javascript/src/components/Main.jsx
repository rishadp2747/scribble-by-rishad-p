import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { setAxiosInterceptor } from "apis/axios";
import redirectionApi from "apis/redirection";
import CreateArticle from "components/Article/CreateArticle";
import EditArticle from "components/Article/EditArticle";
import Container from "components/Common/Container";
import Dashboard from "components/Dashboard";
import Public from "components/Public";
import SettingsContainer from "components/Settings/Container";
import GeneralSettings from "components/Settings/General";
import CategorySettings from "components/Settings/ManageCategory";
import RedirectionsSettings from "components/Settings/Redirection";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [redirections, setRedirections] = useState([]);

  useEffect(() => {
    setAxiosInterceptor();
    fetchRedirections();
  }, []);

  const fetchRedirections = async () => {
    setLoading(true);
    try {
      const response = await redirectionApi.list();
      setRedirections(response.data?.redirections);
    } finally {
      setLoading(false);
    }
  };

  const REDIRECTION_ROUTES = redirections.map(
    ({ from_path, to_path }, index) => (
      <Route
        exact
        key={index}
        path={from_path}
        render={() => (window.location.href = to_path)}
      />
    )
  );

  return (
    <BrowserRouter>
      <Switch>
        {REDIRECTION_ROUTES}

        <Route
          path="/public"
          render={() => <Public loading={loading} setLoading={setLoading} />}
        />
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route
          exact
          path="/settings"
          render={() => <Redirect to="/settings/general" />}
        />

        <Container loading={loading} title="Scribble">
          <Route
            exact
            path="/dashboard"
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

          <SettingsContainer>
            <Route
              exact
              path="/settings/general"
              render={() => (
                <GeneralSettings setLoading={setLoading} loading={loading} />
              )}
            />

            <Route
              exact
              path="/settings/redirections"
              render={() => (
                <RedirectionsSettings
                  setLoading={setLoading}
                  loading={loading}
                />
              )}
            />
            <Route
              exact
              path="/settings/manage-categories"
              render={() => (
                <CategorySettings setLoading={setLoading} loading={loading} />
              )}
            />
          </SettingsContainer>
        </Container>
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
