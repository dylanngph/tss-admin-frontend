import Notify from "components/custom/Notify";
import { REQUEST_STATUS } from "constants/api/apiConfigs";
import { call, put } from "redux-saga/effects";
import { constants } from "redux/loading";

export default function* commonSaga(
  API,
  SUCCESS_TYPE,
  FAIL_TYPE,
  action
) {
  try {
    yield put({ type: constants.SHOW_LOADING });
    const { code, data, message } = yield call(API, action.payload);

    switch (code) {
      case REQUEST_STATUS.SUCCESS:
        yield put({ type: constants.HIDE_LOADING });
        yield put({ type: SUCCESS_TYPE, payload: data });
        if (action.callback) {
          action.callback(true, data, code, message);
        }
        break;
      case REQUEST_STATUS.INVALID_TOKEN: {
        yield put({ type: constants.HIDE_LOADING });
        Notify({ content: message || "Hệ thống xảy ra lỗi" });
        if (action.callback) {
          action.callback(false, data, code, message);
        }
        break;
      }
      default:
        yield put({ type: constants.HIDE_LOADING });
        Notify({ content: message || "Hệ thống xảy ra lỗi" });

        yield put({ type: FAIL_TYPE, payload: { data, message } });
        if (action.callback) {
          action.callback(false, data, code, message);
        }
        break;
    }
  } catch (error) {
    yield put({ type: constants.HIDE_LOADING });
    Notify({ content: error || "Hệ thống xảy ra lỗi" });

    if (action.callback) {
      action.callback(false, error);
    }
  }
}
