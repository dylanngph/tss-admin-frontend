import { API_PROJECT, API_PROJECT_VERSION } from "apis/config";
import { callApi } from "./apiRequest";

const callApiAccount = (method, apiURL, args) => {
  const params = {
    method,
    baseURL: API_PROJECT + API_PROJECT_VERSION,
    apiURL,
    payload: { ...args },
  };
  return callApi(params);
};

export default callApiAccount;
