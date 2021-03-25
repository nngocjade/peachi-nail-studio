import {
  NAILDESIGN_LIST_REQUEST,
  NAILDESIGN_LIST_SUCCESS,
  NAILDESIGN_LIST_FAIL,
} from "../constants/nailDesignConstants";

export const nailDesignListReducer = (state = { nailDesigns: [] }, action) => {
  switch (action.type) {
    case NAILDESIGN_LIST_REQUEST:
      return { loading: true, nailDesigns: [] };
    case NAILDESIGN_LIST_SUCCESS:
      return { loading: false, nailDesigns: action.payload };
    case NAILDESIGN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
