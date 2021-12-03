import axios from "axios";

const list = () => axios.get("articles");
const create = payload => axios.post("articles", payload);

const articleApi = {
  list,
  create,
};
export default articleApi;
