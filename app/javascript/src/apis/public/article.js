import axios from "axios";

const list = () => axios.get("api/public/articles");

const show = articleId => axios.get(`api/public/articles/${articleId}`);

const articleApi = {
  list,
  show,
};

export default articleApi;
