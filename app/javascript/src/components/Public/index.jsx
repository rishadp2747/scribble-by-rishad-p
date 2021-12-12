import React, { useEffect, useState } from "react";

import { Route, Redirect } from "react-router-dom";

import siteApi from "apis/site";
import Container from "components/Common/Container";
import Home from "components/Public/Home";
import Login from "components/Public/Login";
import MenuContainer from "components/Public/Menu/Container";
import { getFromSession } from "helpers/session";

const Public = ({ loading, setLoading }) => {
  const [siteSettings, setSiteSettings] = useState();
  const authToken = getFromSession("authToken");
  const isLoggedIn = authToken ? true : false;

  useEffect(() => {
    fetchSite();
  }, []);

  const fetchSite = async () => {
    setLoading(true);

    try {
      const response = await siteApi.show();
      setSiteSettings(response.data?.site);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      loading={loading}
      titlePosition="center"
      title={siteSettings?.name}
    >
      {siteSettings?.isPassword && !isLoggedIn ? (
        <>
          <Route
            exact
            path="/public/login"
            render={() => (
              <Login siteSettings={siteSettings} setLoading={setLoading} />
            )}
          />
          <Redirect from="/public" to={{ pathname: "/public/login" }} />
        </>
      ) : (
        <MenuContainer setLoading={setLoading}>
          <Route
            path={"/public/articles/:slug/show"}
            render={() => <Home setLoading={setLoading} />}
          />
          <Redirect from="/public" to={{ pathname: "/public/articles" }} />
        </MenuContainer>
      )}
    </Container>
  );
};

export default Public;
