import {
  legacy_createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";
import { accountReducer } from "./account/account.reducer";
import { customerReducer } from "./customer/customer.reducer";
import { bankerReducer } from "./banker/banker.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  customerTr:customerReducer,
  banker:bankerReducer
});

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let enhanser = composer(applyMiddleware(thunk));

export const store = legacy_createStore(rootReducer, enhanser);
