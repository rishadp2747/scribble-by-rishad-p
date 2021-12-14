import axios from "axios";

const login = payload => axios.post("api/public/session", payload);

const sessionApi = {
  login,
};

export default sessionApi;
