import React from "react";

import { Formik, Form } from "formik";
import { Close, Check } from "neetoicon";
import { Typography, Button } from "neetoui";
import { Input, Checkbox } from "neetoui/formik";

import Header from "components/Settings/Header";

import {
  GENERAL_SETTINGS_FORM_INITIAL_VALUE,
  GENERAL_SETTINGS_FORM_VALIDATION,
} from "./constant";

const General = () => {
  const handleSubmit = () => {};

  const passwordValiadtionIcon = (passwordValue, passwordErrors, message) => {
    if (passwordValue === "" || passwordErrors?.includes(message)) {
      return <Close size={15} color="#F56A58" />;
    }

    return <Check size={15} color="#00BA88" />;
  };

  return (
    <>
      <Header
        title="General Settings"
        subTitle="  Configure general attributes of scribble."
      />
      <Formik
        onSubmit={handleSubmit}
        initialValues={GENERAL_SETTINGS_FORM_INITIAL_VALUE}
        validate={GENERAL_SETTINGS_FORM_VALIDATION}
      >
        {({ values, errors }) => (
          <Form className="space-y-4">
            <Input
              required
              type="text"
              label="Site Name"
              name="name"
              helpText="Customize the site name which is used to show the site name in Open Graph Tags."
            />
            <div className="py-4 space-y-4">
              <Checkbox
                name="isPassword"
                id="checkbox_name"
                label="Password Protect Knowledge Base"
              />
              {values.isPassword && (
                <>
                  <Input
                    type="password"
                    label="Password"
                    name="password"
                    className="w-1/2"
                    error={errors.password?.includes("Required") && "Required"}
                  />
                  <div className="flex items-center space-x-1">
                    {passwordValiadtionIcon(
                      values.password,
                      errors.password,
                      "Have at least 6 characters"
                    )}
                    <Typography style="body3">
                      Have at least 6 characters
                    </Typography>
                  </div>
                  <div className="flex items-center space-x-1">
                    {passwordValiadtionIcon(
                      values.password,
                      errors.password,
                      "Include at least 1 letter and 1 number"
                    )}
                    <Typography style="body3">
                      Include at least 1 letter and 1 number
                    </Typography>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-row space-x-2">
              <Button type="submit" style="primary" label="Save Changes" />
              <Button type="reset" style="text" label="Cancel" />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default General;
