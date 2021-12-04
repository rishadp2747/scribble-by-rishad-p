import axios from "axios";

const list = () => axios.get("articles");
const create = payload => axios.post("articles", payload);
const destroy = articleId => axios.delete(`articles/${articleId}`);

const articleApi = {
  list,
  create,
  destroy,
};
export default articleApi;
