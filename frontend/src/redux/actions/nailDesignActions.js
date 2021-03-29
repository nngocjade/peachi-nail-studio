import axios from "axios";
import {
  NAILDESIGN_LIST_REQUEST,
  NAILDESIGN_LIST_SUCCESS,
  NAILDESIGN_LIST_FAIL,
  NAILDESIGN_DELETE_REQUEST,
  NAILDESIGN_DELETE_FAIL,
  NAILDESIGN_DELETE_SUCCESS,
} from "../constants/nailDesignConstants";
import { logout } from "./userActions.js";

// =========== LIST NAIL DESIGNS ACTION ==================

export const listNailDesigns = () => async (dispatch) => {
  try {
    dispatch({ type: NAILDESIGN_LIST_REQUEST });

    const { data } = await axios.get("/api/nailDesigns");

    dispatch({
      type: NAILDESIGN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NAILDESIGN_LIST_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 *  =================================================================
 * -------------------------- ADMIN ONLY -------------------------------
 * ===================================================================
 */
// ================ DELETE NAIL DESIGN ACTION =================

export const deleteNailDesign = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NAILDESIGN_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/nailDesigns/${id}`, config);

    dispatch({
      type: NAILDESIGN_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NAILDESIGN_DELETE_FAIL,
      payload: message,
    });
  }
};
