import axios from "axios";
import { Toastr } from "neetoui";

axios.defaults.baseURL = "/";

axios.defaults.headers = {
  "Content-Type": "application/json",
  common: {
    "X-CSRF-TOKEN": document.querySelector("[name=csrf-token]").content,
  },
};

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
