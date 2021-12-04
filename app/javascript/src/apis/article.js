import axios from "axios";

const list = () => axios.get("api/articles");

const show = articleId => axios.get(`api/articles/${articleId}`);

const update = (articleId, payload) =>
  axios.put(`api/articles/${articleId}`, payload);

const create = payload => axios.post("api/articles", payload);

const destroy = articleId => axios.delete(`api/articles/${articleId}`);

const articleApi = {
  list,
  show,
  update,
  create,
  destroy,
};
export default articleApi;
