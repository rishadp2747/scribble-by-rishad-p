import axios from "axios";

const show = () => axios.get("api/sites");

const update = payload => axios.put("api/sites", payload);

const siteApi = {
  show,
  update,
};
export default siteApi;
