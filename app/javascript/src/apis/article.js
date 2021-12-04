import axios from "axios";

const list = () => axios.get("articles");
const create = payload => axios.post("articles", payload);
const destroy = id => axios.delete(`articles/${id}`);

const articleApi = {
  list,
  create,
  destroy,
};
export default articleApi;
