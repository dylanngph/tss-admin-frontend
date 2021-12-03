import * as constants from "./project.constant";

/** Get Project Info */
export const getProjectInfo = (payload, callback) => ({
  type: constants.GET_PROJECT_INFO,
  payload,
  callback,
});

export const getProjectInfoSuccess = (payload, callback) => ({
  type: constants.GET_PROJECT_INFO_SUCCESS,
  payload,
  callback,
});

export const getProjectInfoFail = (payload, callback) => ({
  type: constants.GET_PROJECT_INFO_FAIL,
  payload,
  callback,
});

/** Post Approval Project */
export const postProjectApproval = (payload, callback) => ({
  type: constants.POST_PROJECT_APPROVAL,
  payload,
  callback,
});

export const postProjectApprovalSuccess = (payload, callback) => ({
  type: constants.POST_PROJECT_APPROVAL_SUCCESS,
  payload,
  callback,
});

export const postProjectApprovalFail = (payload, callback) => ({
  type: constants.POST_PROJECT_APPROVAL_FAIL,
  payload,
  callback,
});
