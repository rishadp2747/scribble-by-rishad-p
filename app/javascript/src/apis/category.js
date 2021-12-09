import axios from "axios";

const list = () => axios.get("api/categories");

const update = (categoryId, payload) =>
  axios.put(`api/categories/${categoryId}`, payload);

const sort = payload => axios.put(`api/categories/sort`, payload);

const create = payload => axios.post("api/categories", payload);

const destroy = categoryId => axios.delete(`api/categories/${categoryId}`);

const categoryApi = {
  list,
  update,
  sort,
  create,
  destroy,
};

export default categoryApi;
