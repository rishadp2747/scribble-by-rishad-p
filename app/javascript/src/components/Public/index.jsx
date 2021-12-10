import React, { useEffect, useState } from "react";

import siteApi from "apis/site";
import Container from "components/Common/Container";

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
      helo
    </Container>
  );
};

export default Public;
