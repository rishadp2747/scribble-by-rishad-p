import axios from "axios";

const list = () => axios.get("api/categories");

const update = (categoryId, payload) =>
  axios.put(`api/categories/${categoryId}`, payload);

const create = payload => axios.post("api/categories", payload);

const categoryApi = {
  list,
  update,
  create,
};

export default categoryApi;
