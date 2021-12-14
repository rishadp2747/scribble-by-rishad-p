import React from "react";

import { Route, Redirect } from "react-router-dom";

import SettingsContainer from "components/Dashboard/Settings/Container";
import GeneralSettings from "components/Dashboard/Settings/General";
import CategorySettings from "components/Dashboard/Settings/ManageCategory";
import RedirectionsSettings from "components/Dashboard/Settings/Redirection";

const SettingsRoute = ({ setLoading }) => {
  return (
    <SettingsContainer>
      <Redirect exact from="/settings" to="/settings/general" />
      <Route
        exact
        path="/settings/general"
        render={() => <GeneralSettings setLoading={setLoading} />}
      />

      <Route
        exact
        path="/settings/redirections"
        render={() => <RedirectionsSettings setLoading={setLoading} />}
      />
      <Route
        exact
        path="/settings/manage-categories"
        render={() => <CategorySettings setLoading={setLoading} />}
      />
    </SettingsContainer>
  );
};

export default SettingsRoute;
