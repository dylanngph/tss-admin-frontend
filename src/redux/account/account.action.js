import * as constants from "./account.constant";

/** Login */
export const postAccountLogin = (payload, callback) => ({
  type: constants.ACCOUNT_LOGIN,
  payload,
  callback,
});

export const postAccountLoginSuccess = (payload, callback) => ({
  type: constants.ACCOUNT_LOGIN_SUCCESS,
  payload,
  callback,
});

export const postAccountLoginFail = (payload, callback) => ({
  type: constants.ACCOUNT_LOGIN_FAIL,
  payload,
  callback,
});

/** Regiter */
export const postAccountRegister = (payload, callback) => ({
  type: constants.ACCOUNT_REGISTER,
  payload,
  callback,
});

export const postAccountRegisterSuccess = (payload, callback) => ({
  type: constants.ACCOUNT_REGISTER_SUCCESS,
  payload,
  callback,
});

export const postAccountRegisterFail = (payload, callback) => ({
  type: constants.ACCOUNT_REGISTER_FAIL,
  payload,
  callback,
});

/** ForgotPass */

export const postAccountForgotPass = (payload, callback) => ({
  type: constants.ACCOUNT_FORGOTPASS,
  payload,
  callback,
});

export const postAccountForgotPassSuccess = (payload, callback) => ({
  type: constants.ACCOUNT_FORGOTPASS_SUCCESS,
  payload,
  callback,
});

export const postAccountForgotPassFail = (payload, callback) => ({
  type: constants.ACCOUNT_FORGOTPASS_FAIL,
  payload,
  callback,
});
