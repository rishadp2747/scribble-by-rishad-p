import React, { useState } from "react";

import { Typography, Label, Input, Button } from "neetoui";

import sessionApi from "apis/public/session";
import Password from "assets/images/Password.png";
import { setToSession } from "helpers/session";

const Login = ({ setLoading, siteSettings }) => {
  const [password, setPassword] = useState({ value: "", error: "" });

  const validatePassword = value => {
    const error = value.trim() === "" ? "Required" : "";
    if (error) {
      setPassword(password => ({ ...password, error: error }));
      return false;
    }

    return true;
  };

  const handleChangePassword = e => {
    const value = e.target.value;
    if (validatePassword(value)) {
      setPassword(password => ({ ...password, value: value }));
    }
  };

  const handleSubmit = async () => {
    if (validatePassword(password.value)) {
      setLoading(true);
      try {
        const payload = { site: { password: password.value } };
        const response = await sessionApi.login(payload);
        const authToken = response.data?.authentication_token;
        if (authToken) {
          setToSession({
            authToken: response.data?.authentication_token,
          });
          window.location.href = "/public/articles";
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-3">
      <img src={Password} width="210" height="218" />
      <div className="flex flex-col justify-start space-y-1">
        <Typography style="h4">
          {siteSettings.name} is password protected!
        </Typography>
        <Label>Enter the password to gain access to spinkart.</Label>
        <Input
          required
          type="password"
          label="Password"
          className="py-4"
          placeholder="*******"
          error={password?.error}
          onChange={handleChangePassword}
        />
        <div className="w-2/5">
          <Button label="Continue" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Login;
