import axios from "axios";

const list = () => axios.get("api/categories");

const update = (categoryId, payload) =>
  axios.put(`api/categories/${categoryId}`, payload);

const reorder = payload => axios.put(`api/categories/reorder`, payload);

const create = payload => axios.post("api/categories", payload);

const destroy = categoryId => axios.delete(`api/categories/${categoryId}`);

const categoryApi = {
  list,
  update,
  reorder,
  create,
  destroy,
};

export default categoryApi;
