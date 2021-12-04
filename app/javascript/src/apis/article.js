import axios from "axios";

const list = () => axios.get("articles");
const show = articleId => axios.get(`articles/${articleId}`);
const update = (articleId, payload) =>
  axios.put(`articles/${articleId}`, payload);
const create = payload => axios.post("articles", payload);
const destroy = articleId => axios.delete(`articles/${articleId}`);

const articleApi = {
  list,
  show,
  update,
  create,
  destroy,
};
export default articleApi;
