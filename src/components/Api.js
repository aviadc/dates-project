import axios from "axios";

const datesApi = axios.create({
  baseURL: "https://61cebb9165c32600170c7cdb.mockapi.io/"
});

export default datesApi