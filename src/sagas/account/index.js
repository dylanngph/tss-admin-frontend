import postForgotPassAccount from "./postForgotPassAccount.saga";
import postLoginAccount from "./postLoginAccount.saga";
import postRegisterAccount from "./postRegisterAccount.saga";

const listSaga = [postRegisterAccount, postLoginAccount, postForgotPassAccount]
export default listSaga