import axios from "axios";

const list = () => axios.get("categories");
const create = payload => axios.post("categories", payload);

const categoryApi = {
  list,
  create,
};

export default categoryApi;
