import axios from "axios";

const list = () => axios.get("api/public/articles");

const articleApi = {
  list,
};

export default articleApi;
