import React, { useEffect, useState } from "react";

import { Route } from "react-router-dom";

import siteApi from "apis/site";
import Container from "components/Common/Container";
import Home from "components/Public/Home";
import Login from "components/Public/Login";
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

  const isPrivateArticle = () => {
    if (siteSettings) {
      return siteSettings.isPassword && !isLoggedIn ? (
        <Login siteSettings={siteSettings} setLoading={setLoading} />
      ) : (
        <Home setLoading={setLoading} />
      );
    }

    return <></>;
  };

  return (
    <Container
      loading={loading}
      titlePosition="center"
      title={siteSettings?.name}
    >
      <Route
        exact
        path="/public/articles/:slug/show"
        render={isPrivateArticle}
      />

      <Route exact path="/public/articles/" render={isPrivateArticle} />

      {/* {siteSettings?.isPassword && !isLoggedIn ? (
        <>
          <Route
            exact
            path="/public/login"
            render={() => (
              <Login
                siteSettings={siteSettings}
                setLoading={setLoading}
                slug={slug}
              />
            )}
          />
          <Redirect from="/public" to={{ pathname: "/public/login" }} />
        </>
      ) : (
        <MenuContainer setLoading={setLoading}>
          {/* <Route
            path={"/public/articles/:slug/show"}
            render={() => <Home setLoading={setLoading} />}
          /> */}
      {/* <Redirect from="/public" to={{ pathname: "/public/articles" }} /> */}
      {/* </MenuContainer> */}
      {/* )} */}
    </Container>
  );
};

export default Public;
