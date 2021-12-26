import * as actionTypes from "./actionTypes";
import { apiGetColumns, apiGetCountOfColumn, apiGetColumnValues, apiGetCountOfColumnWithCondition } from "../api/api";

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

export const setColumnValues = (payload) => ({
  type: actionTypes.SET_COLUMN_VALUES,
  payload,
});

export const getColumnValues = (column) => (dispatch) => {
  return apiGetColumnValues(
    column,
    (response) => {
      dispatch(setColumnValues(response.data));
      return response;
    },
    (err) => {
    }
  );
};

export const setCountOfColumn = (payload) => ({
  type: actionTypes.SET_COUNTS,
  payload,
});

export const getCountOfColumn = (column) => (dispatch) => {
  return apiGetCountOfColumn(
    column,
    (response) => {
      dispatch(setCountOfColumn(response.data));
      return response;
    },
    (err) => {
    }
  );
};

export const getCountOfColumnWithCondition = (column1, column1Val, column2) => (dispatch) => {
  return apiGetCountOfColumnWithCondition(
    column1,
    column1Val,
    column2,
    (response) => {
      dispatch(setCountOfColumn(response.data));
      return response;
    },
    (err) => {
    }
  );
};