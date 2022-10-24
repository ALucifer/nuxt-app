import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:3333/";

export const client = axios.create();

export const contact = async (form) => {
  return await axios
    .post("http://127.0.0.1:3333/contact", form, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      return error.response.status;
    });
};
