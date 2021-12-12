import axios from "axios";
import { Toastr } from "neetoui";

import { getFromLocalStorage } from "helpers/storage.js";

axios.defaults.baseURL = "/";

const authToken = getFromLocalStorage("authToken");

axios.defaults.headers = {
  "Content-Type": "application/json",

  "X-CSRF-TOKEN": document.querySelector("[name=csrf-token]").content,
};

authToken && (axios.defaults.headers["X-Auth-Token"] = authToken);

const handleSuccessResponse = response => {
  if (response?.status === 200 && response?.data?.notice) {
    Toastr.success(response.data.notice);
  }

  return response;
};

const handleErrorResponse = axiosErrorObject => {
  const error = axiosErrorObject.response?.data?.error;
  const default_error_message = "Something went wrong";
  Toastr.error(Error(error || default_error_message));

  return Promise.reject(axiosErrorObject);
};

export const setAxiosInterceptor = () => {
  axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse);
};
