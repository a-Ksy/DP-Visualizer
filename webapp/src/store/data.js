import * as actionTypes from "./actionTypes";
import { apiGetColumns, apiGetCountOfColumn } from "../api/api";

export const setColumns = (payload) => ({
  type: actionTypes.SET_COLUMNS,
  payload,
});

export const getColumns = () => (dispatch) => {
  dispatch({ type: actionTypes.SHOW_LOADING });
  return apiGetColumns(
    (response) => {
      dispatch(setColumns(response.data));
      dispatch({ type: actionTypes.HIDE_LOADING });
      return response;
    },
    (err) => {
      dispatch({ type: actionTypes.HIDE_LOADING });
    }
  );
};

export const setCountOfColumn = (payload) => ({
  type: actionTypes.SET_COUNTS,
  payload,
});

export const getCountOfColumn = (column) => (dispatch) => {
  dispatch({ type: actionTypes.SHOW_LOADING });
  return apiGetCountOfColumn(
    column,
    (response) => {
      dispatch(setCountOfColumn(response.data));
      dispatch({ type: actionTypes.HIDE_LOADING });
      return response;
    },
    (err) => {
      dispatch({ type: actionTypes.HIDE_LOADING });
    }
  );
};
