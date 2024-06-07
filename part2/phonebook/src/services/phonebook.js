import axios from "axios";
const baseUrl = "http://172.25.20.171:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

export default { getAll, create };
