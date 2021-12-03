import callApiProject from "apis/middleware/apiProject";

const projectApi = {
  getInfoProject(args) {
    return callApiProject("get", "/project/info", args);
  },

  postApprovalProject(args) {
    return callApiProject("post", "/project/approval", args);
  },
};

export default projectApi;
