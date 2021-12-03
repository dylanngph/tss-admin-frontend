import getProjectInfo from "./getProjectInfo.saga";
import postProjectApproval from "./postProjectApproval.saga";

const listSaga = [getProjectInfo, postProjectApproval]
export default listSaga