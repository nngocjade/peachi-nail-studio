import axios from "axios";
import {
  NAILDESIGN_LIST_REQUEST,
  NAILDESIGN_LIST_SUCCESS,
  NAILDESIGN_LIST_FAIL,
} from "../constants/nailDesignConstants";

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
