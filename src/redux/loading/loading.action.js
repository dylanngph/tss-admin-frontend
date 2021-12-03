import * as constants from "./loading.constant";

export const showLoading = () => ({ type: constants.SHOW_LOADING });

export const hideLoading = () => ({ type: constants.HIDE_LOADING });

export const error404 = () => ({ type: constants.ERROR_401 });
