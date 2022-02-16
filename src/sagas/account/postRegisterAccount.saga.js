import { call, put, takeLatest } from "redux-saga/effects";
import { REQUEST_STATUS } from "constants/api/apiConfigs";
import { constants } from "redux/account";
import accountApi from "apis/callApi/callAccount";
import { constants as loadingConstant } from "redux/loading";
import Notify from "components/custom/Notify";

function* doAction(action) {
  try {
    yield put({ type: loadingConstant.SHOW_LOADING });
    const resData = yield call(accountApi.postRegisterAccount, action.payload);
    const { code, data, message } = resData;
    switch (code) {
      case REQUEST_STATUS.SUCCESS:
        yield put({ type: loadingConstant.HIDE_LOADING });
        yield put({
          type: constants.ACCOUNT_REGISTER_SUCCESS,
          payload: { code, data, message },
        });
        break;
      default:
        yield put({ type: loadingConstant.HIDE_LOADING });
        Notify({content: message || 'Hệ thống xảy ra lỗi'})
        yield put({
          type: constants.ACCOUNT_REGISTER_FAIL,
          payload: { data, message },
        });
        if (action.callback) {
          action.callback(false, data, code, message);
        }
    }
  } catch (error) {
    yield put({ type: loadingConstant.HIDE_LOADING });
    Notify({content: error || 'Hệ thống xảy ra lỗi'})
    yield put({ type: constants.ACCOUNT_REGISTER_FAIL });
    if (action.callback) {
      action.callback(false, error);
    }
  }
}

export default function* postRegisterAccount() {
  yield takeLatest(constants.ACCOUNT_REGISTER, doAction);
}
