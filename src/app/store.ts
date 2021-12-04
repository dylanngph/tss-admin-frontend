import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import rootSaga from "sagas";
import { history } from "utils/general";
import rootReducer from "./../redux/index";

const rootStore = combineReducers({
  router: connectRouter(history),
  rootReducer
})

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootStore,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: true,
    }).concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
