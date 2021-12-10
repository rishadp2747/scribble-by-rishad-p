import axios from "axios";

const show = () => axios.get(`api/sites`);

const siteApi = {
  show,
};
export default siteApi;
