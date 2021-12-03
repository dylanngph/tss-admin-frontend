import { REQUEST_STATUS } from "constants/api/apiConfigs";
import AxiosBase from "./apiBase";

export const callApi = async (props) => {
  const { method, baseURL, apiURL, payload } = props;

  let response = null;
  let body = payload;
  try {
    response = await AxiosBase(baseURL)[method.toLowerCase()](apiURL, body);
  } catch (error) {
    return {
      code: error?.code || REQUEST_STATUS.UNKNOWN_ERROR,
      data: error?.data,
      message: error?.message,
    };
  }

  return response;
};
