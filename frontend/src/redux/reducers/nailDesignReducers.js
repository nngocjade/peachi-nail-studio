import {
  NAILDESIGN_LIST_REQUEST,
  NAILDESIGN_LIST_SUCCESS,
  NAILDESIGN_LIST_FAIL,
  NAILDESIGN_DELETE_REQUEST,
  NAILDESIGN_DELETE_SUCCESS,
  NAILDESIGN_DELETE_FAIL,
  NAILDESIGN_CREATE_REQUEST,
  NAILDESIGN_CREATE_SUCCESS,
  NAILDESIGN_CREATE_FAIL,
  NAILDESIGN_CREATE_RESET,
  NAILDESIGN_DETAILS_REQUEST,
  NAILDESIGN_DETAILS_SUCCESS,
  NAILDESIGN_DETAILS_FAIL,
  NAILDESIGN_UPDATE_REQUEST,
  NAILDESIGN_UPDATE_SUCCESS,
  NAILDESIGN_UPDATE_FAIL,
  NAILDESIGN_UPDATE_RESET,
} from "../constants/nailDesignConstants";

// ======================== NAIL DESIGN LIST REDUCER ==========================

export const nailDesignListReducer = (state = { nailDesigns: [] }, action) => {
  switch (action.type) {
    case NAILDESIGN_LIST_REQUEST:
      return { loading: true, nailDesigns: [] };
    case NAILDESIGN_LIST_SUCCESS:
      return {
        loading: false,
        nailDesigns: action.payload.nailDesigns,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case NAILDESIGN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ======================== NAIL DESIGN DETAILS REDUCER ==========================

export const nailDesignDetailsReducer = (
  state = { nailDesign: [] },
  action
) => {
  switch (action.type) {
    case NAILDESIGN_DETAILS_REQUEST:
      return { ...state, loading: true };
    case NAILDESIGN_DETAILS_SUCCESS:
      return { loading: false, nailDesign: action.payload };
    case NAILDESIGN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

/**
 *  =================================================================
 * -------------------------- ADMIN ONLY -------------------------------
 * ===================================================================
 */
// ================ DELETE REDUCER =========================

export const nailDesignDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NAILDESIGN_DELETE_REQUEST:
      return { loading: true };
    case NAILDESIGN_DELETE_SUCCESS:
      return { loading: false, success: true };
    case NAILDESIGN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ================ CREATE REDUCER =========================

export const nailDesignCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NAILDESIGN_CREATE_REQUEST:
      return { loading: true };
    case NAILDESIGN_CREATE_SUCCESS:
      return { loading: false, success: true, nailDesign: action.payload };
    case NAILDESIGN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case NAILDESIGN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// ================ UPDATE REDUCER =========================

export const nailDesignUpdateReducer = (state = { nailDesign: {} }, action) => {
  switch (action.type) {
    case NAILDESIGN_UPDATE_REQUEST:
      return { loading: true };
    case NAILDESIGN_UPDATE_SUCCESS:
      return { loading: false, success: true, nailDesign: action.payload };
    case NAILDESIGN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case NAILDESIGN_UPDATE_RESET:
      return { nailDesign: {} };
    default:
      return state;
  }
};
