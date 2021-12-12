import axios from "axios";

const list = () => axios.get("api/public/categories");

const categoryApi = {
  list,
};

export default categoryApi;
