import axios from "axios";

import {
  BLOGPOST_LIST_REQUEST,
  BLOGPOST_LIST_SUCCESS,
  BLOGPOST_LIST_FAIL,
  BLOGPOST_CREATE_REQUEST,
  BLOGPOST_CREATE_SUCCESS,
  BLOGPOST_CREATE_FAIL,
  BLOGPOST_DETAILS_REQUEST,
  BLOGPOST_DETAILS_SUCCESS,
  BLOGPOST_DETAILS_FAIL,
  BLOGPOST_UPDATE_FAIL,
  BLOGPOST_UPDATE_SUCCESS,
  BLOGPOST_UPDATE_REQUEST,
  BLOGPOST_DELETE_SUCCESS,
  BLOGPOST_DELETE_REQUEST,
  BLOGPOST_DELETE_FAIL,
} from "../constants/blogPostConstants";
import { logout } from "./userActions";

// =========== LIST BLOG POSTS ACTION ==================

export const listBlogPosts = () => async (dispatch) => {
  try {
    dispatch({ type: BLOGPOST_LIST_REQUEST });

    const { data } = await axios.get("/api/blogPosts");

    console.log("list blog posts", data);

    dispatch({
      type: BLOGPOST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOGPOST_LIST_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// =========== LIST BLOG POST DETAILS ACTION ==================

export const listBlogPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOGPOST_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/blogPosts/${id}`);

    console.log("list blog post details", data);

    dispatch({
      type: BLOGPOST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOGPOST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 *
 * =======================================================================
 * --------------------------- ADMIN ONLY --------------------------------
 * =======================================================================
 */

// =========== CREATE BLOG POSTS ACTION ==================

export const createBlogPost = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOGPOST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/blogPosts", {}, config);

    console.log("create blog post", data);

    dispatch({
      type: BLOGPOST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOGPOST_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ================ UPDATE NAIL DESIGN ACTION =================

export const updateBlogPost = (blogPost) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOGPOST_UPDATE_REQUEST,
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
      `/api/blogPosts/${blogPost._id}`,
      blogPost,
      config
    );

    dispatch({
      type: BLOGPOST_UPDATE_SUCCESS,
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
      type: BLOGPOST_UPDATE_FAIL,
      payload: message,
    });
  }
};

// ================ DELETE NAIL DESIGN ACTION =================

export const deleteBlogPost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOGPOST_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/blogPosts/${id}`, config);

    dispatch({
      type: BLOGPOST_DELETE_SUCCESS,
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
      type: BLOGPOST_DELETE_FAIL,
      payload: message,
    });
  }
};
