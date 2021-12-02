import axios from "axios";

const list = () => axios.get("categories");

const categoryApi = {
  list,
};

export default categoryApi;
