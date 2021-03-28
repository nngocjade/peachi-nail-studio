import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// ============= NAIL DESIGNS REDUCERS ===================
import { nailDesignListReducer } from "./reducers/nailDesignReducers";

// =================== USER LOGIN REDUCER ================
import {
  userLoginReducer,
  userRegisterReducer,
} from "../redux/reducers/userReducers";

const reducer = combineReducers({
  nailDesignList: nailDesignListReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
