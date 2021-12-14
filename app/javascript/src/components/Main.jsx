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
  // const [redirections, setRedirections] = useState([]);

  useEffect(() => {
    setAxiosInterceptor();
    // fetchRedirections();
  }, []);

  // const fetchRedirections = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await redirectionApi.list();
  //     setRedirections(response.data?.redirections);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const REDIRECTION_ROUTES = redirections.map(
  //   ({ from_path, to_path }, index) => (
  //     <Route
  //       exact
  //       key={index}
  //       path={from_path}
  //       render={() => (window.location.href = to_path)}
  //     />
  //   )
  // );

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/public"
          render={() => <Public loading={loading} setLoading={setLoading} />}
        />
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
