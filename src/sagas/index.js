import { fork, all } from "redux-saga/effects";
import Accounts from "sagas/account";
import Project from "sagas/project";

function* rootSagas() {
  yield all([
    /* Accounts saga */
    ...Accounts.map((saga) => fork(saga)),

    /* Users saga */
    ...Project.map((saga) => fork(saga)),
  ]);
}

export default rootSagas;
