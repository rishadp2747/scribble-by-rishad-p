import React from "react";

import { ExternalLink } from "neetoicon";
import { Button, PageLoader } from "neetoui";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Header from "components/Common/Container/Header";
import NavBar from "components/Common/Container/NavBar";

const Container = ({ loading, title, titlePosition, children }) => {
  return (
    <div className="w-full h-screen">
      <Header
        title={title}
        titlePosition={titlePosition}
        navLinks={<NavBar />}
        actionBlock={
          <Link to="/public/articles" target="_blank">
            <Button
              icon={ExternalLink}
              iconPosition="right"
              style="secondary"
              label="Preview"
            />
          </Link>
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
