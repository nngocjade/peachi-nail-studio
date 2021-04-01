import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// ============= NAIL DESIGNS REDUCERS ===================
import {
  nailDesignListReducer,
  nailDesignDetailsReducer,
  nailDesignDeleteReducer,
  nailDesignCreateReducer,
  nailDesignUpdateReducer,
} from "./reducers/nailDesignReducers";

// =================== USER LOGIN REDUCER ================
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userListReducer,
  userUpdateReducer,
} from "../redux/reducers/userReducers";

import {
  blogPostListReducer,
  blogPostCreateReducer,
} from "./reducers/blogPostReducers";

const reducer = combineReducers({
  nailDesignList: nailDesignListReducer,
  nailDesignDetails: nailDesignDetailsReducer,
  nailDesignDelete: nailDesignDeleteReducer,
  nailDesignCreate: nailDesignCreateReducer,
  nailDesignUpdate: nailDesignUpdateReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  blogPostList: blogPostListReducer,
  blogPostCreate: blogPostCreateReducer,
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
