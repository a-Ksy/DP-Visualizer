import { BASE_URL, apiCall, methods } from "../utils/apiCall";

export const apiGetColumns = async (callback, onError) => {
  return apiCall(
    `${BASE_URL}/columns`,
    methods.GET,
    null,
    null,
    null,
    callback,
    onError
  );
};

export const apiGetCountOfColumn = async (column, callback, onError) => {
  const params = { attr: column };

  return apiCall(
    `${BASE_URL}/count`,
    methods.GET,
    params,
    null,
    null,
    callback,
    onError
  );
};

export const apiGetColumnValues = async (column, callback, onError) => {
  const params = { attr: column };

  return apiCall(
    `${BASE_URL}/columnValues`,
    methods.GET,
    params,
    null,
    null,
    callback,
    onError
  );
};
