import axios from "axios";

const list = () => axios.get("api/redirections");

const update = (redirectionId, payload) =>
  axios.put(`api/redirections/${redirectionId}`, payload);

const create = payload => axios.post("api/redirections", payload);

const destroy = redirectionId =>
  axios.delete(`api/redirections/${redirectionId}`);

const redirectionApi = {
  list,
  create,
  update,
  destroy,
};

export default redirectionApi;
