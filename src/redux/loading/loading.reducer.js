import * as constants from './loading.constant';

const initialState = {
  showLoading: false,
};

export default function loading(state = initialState, action) {
  switch (action.type) {
    case constants.SHOW_LOADING:
      return { ...state, showLoading: true };
    case constants.HIDE_LOADING:
      return { ...state, showLoading: false };
    default:
      return state;
  }
}
