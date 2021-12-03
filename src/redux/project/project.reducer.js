import { combineReducers } from "redux";
import * as constants from "./project.constant";
import { constants as loadingConstants } from "redux/loading";

const initialState = {
  responseGetProjectInfo: null,
  responsePostProjectApproval: null,
};

function projectStore(state = initialState, action) {
  switch (action.type) {
    case constants.GET_PROJECT_INFO:
      return {
        ...state,
        isLoadingGetProjectInfo: true,
      };
    case constants.GET_PROJECT_INFO_SUCCESS:
      return {
        ...state,
        isLoadingGetProjectInfo: false,
        responseGetProjectInfo: action?.payload,
      };

    case constants.GET_PROJECT_INFO_FAIL:
      return {
        ...state,
        isLoadingGetProjectInfo: false,
        responseGetProjectInfo: action?.payload,
      };

    case constants.POST_PROJECT_APPROVAL:
      return {
        ...state,
        isLoadingPostProjectApproval: true,
      };

    case constants.POST_PROJECT_APPROVAL_SUCCESS:
      return {
        ...state,
        isLoadingPostProjectApproval: false,
        responsePostProjectApproval: action?.payload,
      };

    case constants.POST_PROJECT_APPROVAL_FAIL:
      return {
        ...state,
        isLoadingPostProjectApproval: false,
        responsePostProjectApproval: action?.payload,
      };
    case loadingConstants.ERROR_401:
    default:
      return state;
  }
}

export default combineReducers({ projectStore });
