import { combineReducers } from "redux";
import * as constants from "./account.constant";
import { constants as loadingConstants } from "redux/loading";

const initialState = {
  responseLogin: null,
  responseRegister: null,
  responseForgotPass: null,
};

function accountStore(state = initialState, action) {
  switch (action.type) {
    case constants.ACCOUNT_REGISTER:
      return {
        ...state,
        isLoadingRegister: true,
      };
    case constants.ACCOUNT_REGISTER_SUCCESS:
      return {
        ...state,
        isLoadingRegister: false,
        responseRegister: action?.payload,
      };

    case constants.ACCOUNT_REGISTER_FAIL:
      return {
        ...state,
        isLoadingRegister: false,
        responseRegister: action?.payload,
      };

    case constants.ACCOUNT_LOGIN:
      return {
        ...state,
        isLoadingLogin: true,
      };
    case constants.ACCOUNT_LOGIN_SUCCESS:
      return {
        ...state,
        isLoadingLogin: false,
        responseLogin: action?.payload,
      };
    case constants.ACCOUNT_LOGIN_FAIL:
      return {
        ...state,
        isLoadingLogin: false,
        responseLogin: action?.payload,
      };
    case constants.ACCOUNT_FORGOTPASS:
      return {
        ...state,
        isLoadingForgotPass: true,
      };
    case constants.ACCOUNT_FORGOTPASS_SUCCESS:
      return {
        ...state,
        isLoadingForgotPass: false,
        responseForgotPass: action?.payload,
      };
    case constants.ACCOUNT_FORGOTPASS_FAIL:
      return {
        ...state,
        isLoadingForgotPass: false,
        responseForgotPass: action?.payload,
      };
    case loadingConstants.ERROR_401:
    default:
      return state;
  }
}

export default combineReducers({ accountStore });
