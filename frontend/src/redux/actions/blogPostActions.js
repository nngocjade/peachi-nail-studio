import axios from "axios";

import {
  BLOGPOST_LIST_REQUEST,
  BLOGPOST_LIST_SUCCESS,
  BLOGPOST_LIST_FAIL,
  BLOGPOST_CREATE_REQUEST,
  BLOGPOST_CREATE_SUCCESS,
  BLOGPOST_CREATE_FAIL,
} from "../constants/blogPostConstants";

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

// =========== CREATE BLOG POSTS ACTION ==================

export const createBlogPost = () => async (dispatch) => {
  try {
    dispatch({ type: BLOGPOST_CREATE_REQUEST });

    const { data } = await axios.post("/api/blogPosts", {});

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
