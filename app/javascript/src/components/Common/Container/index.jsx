import React from "react";

import { ExternalLink } from "neetoicon";
import { Button } from "neetoui";
import PropTypes from "prop-types";

import Header from "components/Common/Container/Header";
import NavBar from "components/Common/Container/NavBar";

const Container = ({ children }) => {
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
      {children}
    </div>
  );
};

Container.prototype = {
  children: PropTypes.node,
};

export default Container;
