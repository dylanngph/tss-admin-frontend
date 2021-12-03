import { API_ACCOUNT, API_ACCOUNT_VERSION } from "apis/config";
import { callApi } from "./apiRequest";

const callApiAccount = (method, apiURL, args) => {
  const params = {
    method,
    baseURL: API_ACCOUNT + API_ACCOUNT_VERSION,
    apiURL,
    payload: { ...args },
  };
  return callApi(params);
};

export default callApiAccount;
