import React, { useEffect, useState } from "react";

import { Route, Redirect } from "react-router-dom";

import siteApi from "apis/site";
import Container from "components/Common/Container";
import Home from "components/Public/Home";
import MenuContainer from "components/Public/MenuContainer";

const Public = ({ loading, setLoading }) => {
  const [siteSettings, setSiteSettings] = useState();

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
      {!siteSettings?.isPassword && (
        <Redirect
          exact
          strict
          from="/public"
          to={{ pathname: "/public/articles" }}
        />
      )}

      <MenuContainer setLoading={setLoading}>
        <Route
          exact
          path="/public/articles"
          render={() => <Home setLoading={setLoading} loading={loading} />}
        />
      </MenuContainer>
    </Container>
  );
};

export default Public;
