import axios from "axios";

const show = () => axios.get("api/site");

const update = payload => axios.put("api/site", payload);

const siteApi = {
  show,
  update,
};
export default siteApi;
