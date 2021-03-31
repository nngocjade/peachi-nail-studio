import axios from "axios";

import {
  BLOGPOST_LIST_REQUEST,
  BLOGPOST_LIST_SUCCESS,
  BLOGPOST_LIST_FAIL,
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
