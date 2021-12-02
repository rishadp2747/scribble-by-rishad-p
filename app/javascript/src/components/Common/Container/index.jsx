import React from "react";

import { ExternalLink } from "neetoicon";
import { Button, PageLoader } from "neetoui";
import PropTypes from "prop-types";

import Header from "components/Common/Container/Header";
import NavBar from "components/Common/Container/NavBar";

const Container = ({ loading, children }) => {
  return (
    <div className="w-full h-screen">
      <Header
        title="Scribble"
        titlePosition="left"
        navLinks={<NavBar />}
        actionBlock={
          <Button
            icon={ExternalLink}
            iconPosition="right"
            style="secondary"
            label="Preview"
          />
        }
      />
      {loading && <PageLoader />}
      {children}
    </div>
  );
};

Container.prototype = {
  loading: PropTypes.bool,
  children: PropTypes.node,
};

export default Container;
