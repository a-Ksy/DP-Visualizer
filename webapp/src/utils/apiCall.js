import axios from "axios";

export const methods = {
  GET: "get",
  POST: "post",
};

export const BASE_URL = "http://127.0.0.1:5000";

export const apiCall = async (
  url,
  method = methods.GET,
  params = null,
  body = null,
  headers = { "Content-Type": "application/json" },
  callback = () => {},
  onError = () => {}
) => {
  await axios({
    url,
    method,
    params,
    body,
    headers,
  })
    .then((response) => {
      callback(response);
    })
    .catch((err) => {
      onError(err);
    });
};
