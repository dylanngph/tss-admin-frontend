import {all} from 'redux-saga/effects'

function* accountSaga(){
    console.log("Account Saga")
}

export default function* rootSaga(){
    console.log("Root Saga");
    yield all([accountSaga()])
}