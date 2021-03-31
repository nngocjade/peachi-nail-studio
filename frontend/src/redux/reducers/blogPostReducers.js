import {
  BLOGPOST_LIST_REQUEST,
  BLOGPOST_LIST_SUCCESS,
  BLOGPOST_LIST_FAIL,
} from "../constants/blogPostConstants";

// ======================== NAIL DESIGN LIST REDUCER ==========================

export const blogPostListReducer = (state = { blogPosts: [] }, action) => {
  switch (action.type) {
    case BLOGPOST_LIST_REQUEST:
      return { loading: true, blogPosts: [] };
    case BLOGPOST_LIST_SUCCESS:
      return { loading: false, blogPosts: action.payload };
    case BLOGPOST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
