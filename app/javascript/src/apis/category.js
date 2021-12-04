import axios from "axios";

const list = () => axios.get("api/categories");
const create = payload => axios.post("api/categories", payload);

const categoryApi = {
  list,
  create,
};

export default categoryApi;
