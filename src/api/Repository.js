import Axios from "axios";

const baseURL = process.env.BASE_URL;

const repository = Axios.create({
  baseURL
});

export default repository;