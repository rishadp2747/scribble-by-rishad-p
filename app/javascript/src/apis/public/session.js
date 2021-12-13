import axios from "axios";

const login = payload => axios.post("api/public/sessions", payload);

const sessionApi = {
  login,
};

export default sessionApi;
