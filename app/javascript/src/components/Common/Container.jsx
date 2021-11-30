import React from "react";

import { ExternalLink } from "neetoicon";
import { Button } from "neetoui";
import { Header } from "neetoui/layouts";
import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <div className="w-full h-screen">
      <Header
        className="shadow"
        title={<span className="ml-6">Scribble</span>}
        actionBlock={
          <Button
            icon={ExternalLink}
            iconPosition="right"
            style="secondary"
            label="Preview"
            className="mr-6"
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
