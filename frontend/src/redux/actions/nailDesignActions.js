import axios from "axios";
import {
  NAILDESIGN_LIST_REQUEST,
  NAILDESIGN_LIST_SUCCESS,
  NAILDESIGN_LIST_FAIL,
  NAILDESIGN_DELETE_REQUEST,
  NAILDESIGN_DELETE_FAIL,
  NAILDESIGN_DELETE_SUCCESS,
  NAILDESIGN_CREATE_REQUEST,
  NAILDESIGN_CREATE_SUCCESS,
  NAILDESIGN_CREATE_FAIL,
  NAILDESIGN_DETAILS_REQUEST,
  NAILDESIGN_DETAILS_SUCCESS,
  NAILDESIGN_DETAILS_FAIL,
  NAILDESIGN_UPDATE_REQUEST,
  NAILDESIGN_UPDATE_SUCCESS,
  NAILDESIGN_UPDATE_FAIL,
} from "../constants/nailDesignConstants";
import { logout } from "./userActions.js";

// =========== LIST NAIL DESIGNS ACTION ==================

export const listNailDesigns = (keyword = "") => async (dispatch) => {
  try {
    dispatch({ type: NAILDESIGN_LIST_REQUEST });

    const { data } = await axios.get(`/api/nailDesigns?keyword=${keyword}`);

    console.log("list nail designs", data);

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

// =========== LIST NAIL DESIGN DETAILS ACTION ==================

export const listNailDesignDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: NAILDESIGN_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/nailDesigns/${id}`);

    console.log("list nail design details", data);

    dispatch({
      type: NAILDESIGN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NAILDESIGN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
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

// ================ CREATE NAIL DESIGN ACTION =================

export const createNailDesign = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NAILDESIGN_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/nailDesigns`, {}, config);

    dispatch({
      type: NAILDESIGN_CREATE_SUCCESS,
      payload: data,
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
      type: NAILDESIGN_CREATE_FAIL,
      payload: message,
    });
  }
};

// ================ UPDATE NAIL DESIGN ACTION =================

export const updateNailDesign = (nailDesign) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NAILDESIGN_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/nailDesigns/${nailDesign._id}`,
      nailDesign,
      config
    );

    dispatch({
      type: NAILDESIGN_UPDATE_SUCCESS,
      payload: data,
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
      type: NAILDESIGN_UPDATE_FAIL,
      payload: message,
    });
  }
};
